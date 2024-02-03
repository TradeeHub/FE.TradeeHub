import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import debounce from 'lodash.debounce';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { PiMapPinLight } from 'react-icons/pi';
import { UserPlace } from '@/app/[locale]/types/sharedTypes';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

type AddressAutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  // ControllerRenderProps includes everything that comes from `render` prop of Controller
  field: ControllerRenderProps<TFieldValues, TName>;
  // Include other props that you expect to receive
  placeholder?: string;
  onPlaceSelected: (place: UserPlace | null) => void;
};

type AutocompletePrediction = {
  description: string;
  place_id: string;
};

function getCountryAndCode(
  addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
) {
  let country: string | null = null;
  let countryCode: string | null = null;

  if (addressComponents) {
    // Iterate over all the address components
    for (const component of addressComponents) {
      if (component.types.includes('country')) {
        country = component.long_name;
        countryCode = component.short_name;
        break; // Stop the loop once the country is found
      }
    }
  }

  return { country, countryCode };
}

function mapPlaceResultToUserPlace(
  placeResult: google.maps.places.PlaceResult,
): UserPlace {
  const { country, countryCode } = getCountryAndCode(
    placeResult.address_components,
  );

  return {
    PlaceId: placeResult.place_id || '',
    Address: placeResult.formatted_address || '',
    Location: {
      lat: placeResult.geometry?.location.lat() || 0,
      lng: placeResult.geometry?.location.lng() || 0,
    },
    Viewport: {
      northeast: {
        lat: placeResult.geometry?.viewport.getNorthEast().lat() || 0,
        lng: placeResult.geometry?.viewport.getNorthEast().lng() || 0,
      },
      southwest: {
        lat: placeResult.geometry?.viewport.getSouthWest().lat() || 0,
        lng: placeResult.geometry?.viewport.getSouthWest().lng() || 0,
      },
    },
    Country: country || '',
    CountryCode: countryCode || '',
    CallingCode: getCountryCallingCode(countryCode as CountryCode) || '',
  };
}

const AddressAutocomplete = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  placeholder = 'Address',
  onPlaceSelected,
}: AddressAutocompleteProps<TFieldValues, TName>) => {
  const user = useSelector((state: RootState) => state.user.data);
  const [labelFloat, setLabelFloat] = useState(false);
  const isMountedRef = useRef(false);
  // const [userLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([]);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  const hasMadeSelection = useRef<boolean>(false);

  const fetchPredictions = debounce((input) => {
    if (input && autocompleteServiceRef.current) {
      const location = new google.maps.LatLng(
        user?.place.location.lat,
        user?.place.location.lng,
      );
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input,
          location: user ? location : undefined,
          radius: user ? 48280 : undefined,
          types: ['address'],
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(
              predictions.map(({ description, place_id }) => ({
                description,
                place_id,
              })),
            );
          } else {
            setSuggestions([]);
          }
        },
      );
    } else {
      setSuggestions([]);
    }
  }, 700);

  const handleSelect = (location: AutocompletePrediction) => {
    const placesService = new google.maps.places.PlacesService(
      document.createElement('div'),
    );

    if (location.place_id) {
      placesService.getDetails(
        {
          placeId: location.place_id,
          fields: [
            'geometry',
            'formatted_address',
            'place_id',
            'address_components',
          ], // Specify the fields here
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const userPlace = mapPlaceResultToUserPlace(place);
            onPlaceSelected(userPlace);
            setSuggestions([]);
            setInputValue(place.formatted_address || '');
          } else {
            console.error('Error getting details:', status);
          }
        },
      );
    } else {
      console.error('Invalid place_id:', location.place_id);
    }
  };

  useEffect(() => {
    if (isMountedRef.current && !hasMadeSelection.current) {
      fetchPredictions(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    if (isMountedRef.current && !hasMadeSelection.current) {
      onPlaceSelected(null);
    }
  }, [hasMadeSelection.current]);

  useEffect(() => {
    setLabelFloat(!!field.value?.Address); // Make sure to safely access Address
  }, [field.value]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey ?? '',
      libraries: ['places'],
    });

    loader.load().then(() => {
      autocompleteServiceRef.current =
        new google.maps.places.AutocompleteService();
    });

    if (field.value?.Address) {
      setInputValue(field.value.Address);
      hasMadeSelection.current = true;
    }

    isMountedRef.current = true;
  }, []);

  const handleInputFocus = () => {
    setLabelFloat(true);
    // You may need additional logic here to handle the popover or other actions on focus
  };
  const handleInputBlur = () => {
    setLabelFloat(!!inputValue);
    // Add here any additional logic if needed when the input loses focus
  };
  const inputId = `input-${field.name}`; // Create a unique ID for the input based on the field name

  return (
    <>
      <div className='relative border-b-2 border-gray-300 font-roboto focus-within:border-primary'>
        <PiMapPinLight className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary transition-all duration-200 ease-in-out' />

        <Popover>
          <PopoverTrigger
            onClick={(e) => e.preventDefault()}
            asChild
            className='rounded-none'
          >
            <Command>
              <input
                id={inputId} // Set the ID for the input
                ref={inputRef}
                className={`text-md w-full bg-transparent px-3 py-1 pl-10 focus:outline-none`}
                style={{ paddingLeft: '2.5rem' }}
                value={inputValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={(v) => {
                  hasMadeSelection.current = false;
                  setInputValue(v.target.value);
                }}
                autoComplete='nope'
                // iconClass='text-secondary opacity-100 h-5 w-5'
              />
            </Command>
          </PopoverTrigger>
          <label
            htmlFor={inputId} // Set the htmlFor attribute to match the input's ID
            className={`absolute transition-all duration-200 ease-in-out ${
              labelFloat || inputValue
                ? 'left-3 top-[-0.7rem] text-xs font-semibold text-primary'
                : 'left-10 top-1/2 -translate-y-1/2 text-sm text-gray-500'
            }`}
          >
            {labelFloat ? placeholder : 'Search for ' + placeholder}
          </label>
          <PopoverContent
            ref={popoverContentRef}
            className='z-50 mt-1 flex w-screen max-w-md flex-col overflow-auto rounded-md bg-white shadow-md'
            side='bottom'
            align='start'
            onOpenAutoFocus={(e) => e.preventDefault()}
            forceMount={suggestions.length > 0 ? true : undefined}
          >
            <Command>
              <CommandList>
                <CommandGroup>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.place_id}
                      onSelect={() => {
                        handleSelect(suggestion);
                        hasMadeSelection.current = true;
                      }}
                    >
                      <PiMapPinLight className='mr-2 h-4 w-4 flex-shrink-0 text-secondary opacity-100' />
                      {suggestion.description}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default AddressAutocomplete;
