import {
  CardEffectSlider,
  CardEffectSliderItemType,
  // Map,
  PartyLocation,
} from "../../components";

const partyLocations: PartyLocation[] = [
  { id: "1", lat: 37.7749, lng: -122.4194 },
  { id: "2", lat: 37.7849, lng: -122.4094 },
  { id: "3", lat: 37.7649, lng: -122.4294 },
];

const initialSlides: CardEffectSliderItemType[] = [
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model2.png",
  },
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model1.png",
  },
];

const Home = () => {
  return (
    <div className="w-[80%] mx-auto py-8">
      <CardEffectSlider slides={initialSlides} />
      {/* <Map partyLocations={partyLocations} /> */}
    </div>
  );
};

export default Home;
