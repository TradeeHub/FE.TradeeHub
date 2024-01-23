import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {
  Command,
  CommandGroup,
  CommandInput,
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

import { ControllerRenderProps, FieldPath, FieldValues, Path } from 'react-hook-form';

type AddressAutocompleteProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  onPlaceSelected: (place: UserPlace | null) => void;
};

type AutocompletePrediction = {
  description: string;
  place_id: string;
};

function mapPlaceResultToUserPlace(
  placeResult: google.maps.places.PlaceResult,
): UserPlace {
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
  };
}

const AddressAutocomplete = <TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  onPlaceSelected
}: AddressAutocompleteProps<TFieldValues, TName>) => {  const isMountedRef = useRef(false);
    console.log('field', field);
  const [userLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
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
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input,
          location: new google.maps.LatLng(
            userLocation?.latitude || 0,
            userLocation?.longitude || 0,
          ),
          radius: 50000,
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
          fields: ['geometry', 'formatted_address', 'place_id'], // Specify the fields here
        },
        (place, status) => {
          place.formatted_address;
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const userPlace = mapPlaceResultToUserPlace(place);
            onPlaceSelected(userPlace);
            setSuggestions([]);
            setInputValue(location.description);
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
    const loader = new Loader({
      apiKey: apiKey ?? '',
      libraries: ['places'],
    });

    loader.load().then(() => {
      autocompleteServiceRef.current =
        new google.maps.places.AutocompleteService();
    });
    isMountedRef.current = true;
  }, []);

  return (
    <>
      <div className='flex items-center font-roboto'>
        <Popover>
          <PopoverTrigger onClick={(e) => e.preventDefault()} asChild>
            <Command>
              <CommandInput
                ref={inputRef}
                placeholder='Search for Address'
                value={inputValue}
                onValueChange={(v) => {
                  hasMadeSelection.current = false;
                  setInputValue(v);
                }}
                iconClass='text-secondary opacity-100 h-5 w-5'
              />
            </Command>
          </PopoverTrigger>

          <PopoverContent
            ref={popoverContentRef}
            className='z-50 mt-1 flex w-screen max-w-md flex-col overflow-auto rounded-lg bg-white shadow-md'
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