import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import debounce from 'lodash.debounce';

interface AddressAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

interface AutocompletePrediction {
  description: string;
  place_id: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onPlaceSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([]);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

  // Debounced fetch predictions function
  const fetchPredictions = debounce((input) => {
    if (input && autocompleteServiceRef.current) {
      autocompleteServiceRef.current.getPlacePredictions({ input }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions.map(({ description, place_id }) => ({ description, place_id })));
        } else {
          setSuggestions([]);
        }
      });
    }
  }, 300);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey ?? '',
      libraries: ['places'],
    });

    loader.load().then(() => {
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    });
  }, [apiKey]);

  useEffect(() => {
    fetchPredictions(inputValue);
  }, [inputValue]);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setInputValue(target.value);
      };

      inputElement.addEventListener('input', handleInput);
      return () => {
        inputElement.removeEventListener('input', handleInput);
      };
    }
  }, []);

const handleSelect = (description: string) => {
  // Find the suggestion that matches the description
  const suggestion = suggestions.find(s => s.description === description);
  if (!suggestion) {
    console.error('Suggestion not found');
    return;
  }

  setInputValue(description);

  const placesService = new google.maps.places.PlacesService(document.createElement('div'));
  
  // Ensure we are passing a valid place_id
  if (suggestion.place_id) {
    placesService.getDetails({ placeId: suggestion.place_id }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        onPlaceSelected(place);
        setSuggestions([]);
      } else {
        console.error('Error getting details:', status);
      }
    });
  } else {
    console.error('Invalid place_id:', suggestion.place_id);
  }
};

  console.log('Current suggestions:', suggestions); // Check the state right before rendering

  return (
    <Command className='rounded-lg border shadow-md'>
      <CommandInput 
        placeholder='Type an address...'
        value={inputValue}
        onValueChange={setInputValue}
      />
    <CommandList>
       <Command>
          {suggestions.length === 0 ? (
            <CommandEmpty>No addresses found.</CommandEmpty>
          ) : (
            <CommandGroup>
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.place_id}
                  onSelect={() => handleSelect(suggestion.description)}
                >
                  {suggestion.description}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </CommandList>
    </Command>
  );
};

export default AddressAutocomplete;
