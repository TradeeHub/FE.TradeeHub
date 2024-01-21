// AddressAutocomplete.tsx
import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useRef } from 'react';

interface AddressAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onPlaceSelected,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  console.log('apiKey', apiKey);
  useEffect(() => {
    if (!apiKey) return;

    const loader = new Loader({
      apiKey,
      libraries: ['places'],
    });

    let autocomplete: google.maps.places.Autocomplete;

    const load = async () => {
      await loader.load();
      if (inputRef.current) {
        autocomplete = new google.maps.places.Autocomplete(inputRef.current);
      }
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      });
    };

    load();
  }, [apiKey, onPlaceSelected]);

  return <input ref={inputRef} type='text' placeholder='Enter an address' />;
};

export default AddressAutocomplete;
