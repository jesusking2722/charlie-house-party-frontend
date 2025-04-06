import countries from "world-countries";
import { GEOAPIFY_API, GOOGLE_MAP_API } from "../constant";
import { Geo } from "../types";

export const getRegionGeo = async (
  countryCode: string,
  regionName: string
): Promise<{ lat: number; lng: number } | null> => {
  const query = `${regionName}, ${countryCode}`;
  const encodedQuery = encodeURIComponent(query);
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedQuery}&apiKey=${GEOAPIFY_API}`;

  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      return { lat, lng: lon };
    } else {
      console.error("No results found for:", query);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from Geoapify:", error);
    return null;
  }
};

export const getCountryGeo = (code: string) => {
  const country = countries.find((c) => c.cca2 === code);
  return country ? { lat: country.latlng[0], lng: country.latlng[1] } : null;
};

export const validateAddress = async (
  address: string,
  countryCode: string,
  locality?: string
): Promise<any> => {
  const url = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLE_MAP_API}`;

  const body: any = {
    address: {
      regionCode: countryCode,
      addressLines: [address],
    },
  };

  if (locality) {
    body.address.locality = locality;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error && data.error.message.includes("Unsupported region code")) {
      console.warn(`Unsupported region code: ${countryCode}`);
      return true;
    }

    if (
      data.result &&
      data.result.verdict &&
      !data.result.verdict.hasUnconfirmedComponents
    ) {
      const validatedAddress = data.result.address.formattedAddress;
      const geo = data.result.geocode.location;
      return { address: validatedAddress, geo };
    } else {
      console.error("Invalid or incomplete address.");
      return null;
    }
  } catch (error) {
    console.error("Error validating address:", error);
    return null;
  }
};

interface GeocoderResult {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    location: google.maps.LatLng;
  };
}

export const getRegionName = (
  lat: string | number,
  lng: string | number
): any => {
  const geocoder = new google.maps.Geocoder();

  const latLng: google.maps.LatLngLiteral = {
    lat: typeof lat === "string" ? parseFloat(lat) : lat,
    lng: typeof lng === "string" ? parseFloat(lng) : lng,
  };

  geocoder.geocode(
    { location: latLng },
    (results: GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
      if (status === "OK" && results?.[0]) {
        const addressComponents = results[0].address_components;
        const region = addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name;

        return region;
      } else {
        console.error("Geocoder failed due to:", status);
      }
    }
  );
};
