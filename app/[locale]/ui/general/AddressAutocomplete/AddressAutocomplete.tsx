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
import { Label } from '@radix-ui/react-select';

type AddressAutocompleteProps = {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
};

type AutocompletePrediction = {
  description: string;
  place_id: string;
};

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onPlaceSelected,
}) => {
  const isMountedRef = useRef(false);
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
    console.log(
      'Fetching predictions for:',
      userLocation?.latitude,
      userLocation?.longitude,
    );
    if (input && autocompleteServiceRef.current) {
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input,
          location: new google.maps.LatLng(
            userLocation?.latitude || 0,
            userLocation?.longitude || 0,
          ),
          radius: 50000, // Search within a 50km radius, for example
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
    setInputValue(location.description);

    const placesService = new google.maps.places.PlacesService(
      document.createElement('div'),
    );

    if (location.place_id) {
      placesService.getDetails(
        { placeId: location.place_id },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            onPlaceSelected(place);
            setSuggestions([]);
            console.log('hasMadeSelection 2222:', hasMadeSelection.current);
            console.log('Place details:', place, suggestions);
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
    console.log('hasMadeSelection:', hasMadeSelection.current);
    if (isMountedRef.current && !hasMadeSelection.current) {
      fetchPredictions(inputValue);
    }else {
      hasMadeSelection.current = false;
    }
  }, [inputValue]);

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
              onValueChange={setInputValue}
              iconClass='text-secondary opacity-100 h-5 w-5'
            />
          </Command>
        </PopoverTrigger>
        
          <PopoverContent
            ref={popoverContentRef}
            className='flex flex-col mt-1 rounded-lg shadow-md bg-white z-50 max-w-md w-screen overflow-auto'
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
                    <PiMapPinLight className='flex-shrink-0 text-secondary opacity-100 h-4 w-4 mr-2' />
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