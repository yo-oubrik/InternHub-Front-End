import { Location } from '@/types/types';
import axios from 'axios';
import toast from 'react-hot-toast';

export const getCoordinatesFromAddress = async (location : Location) => {
    const fullAddress = `${location.address}, ${location.city}, ${location.country}`
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&limit=1`;
    console.log('url', url);
    console.log('fullAddress', fullAddress);
    try {
        const response = await axios.get(url);
        if (response.data.length === 0) {
            toast.error('No coordinates found for the given address');
            return null;
        }
        const { lat , lon } = response.data[0];
        return {
            lat: parseFloat(lat),
            lng: parseFloat(lon)
        };
    } catch (error) {
        toast.error('Failed to get coordinates from address');
        return null;
    }
}