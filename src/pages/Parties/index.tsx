import {useEffect, useState} from "react";
import {Dropdown, IconButton, RegionSelect, Tooltip} from "../../components";
import {Party} from "../../types";
import PartyCardGroup from "./PartyCardGroup";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const initialPartyTypes = ["birthday", "common", "wedding", "corporate"];

const Parties = () => {
    const [availableParties, setAvailableParties] = useState<Party[]>([]);
    const [country, setCountry] = useState<string>("");
    const [partyType, setPartyType] = useState<string>("");
    const [scrolled, setScrolled] = useState<boolean>(false);

    const {parties} = useSelector((state: RootState) => state.party)

    const handleCountryChange = (selectedCountry: string) => {
        const selectedParties = availableParties.filter(
            (party) => party.country === selectedCountry
        );
        setAvailableParties(selectedParties);
        setCountry(selectedCountry);
    };

    const handlePartyTypeChange = (selectedPartyType: string) => {
        const selectedParties = availableParties.filter(
            (party) => party.type === selectedPartyType
        );
        setAvailableParties(selectedParties);
        setPartyType(selectedPartyType);
    };

    const handleResetAll = () => {
        setCountry("");
        setPartyType("");
        setAvailableParties(parties);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (parties.length > 0) {
            setAvailableParties(parties);
        }
    }, [parties]);

    return (
        <div
            className="w-[80%] mx-auto flex flex-col gap-8"
            onScroll={() => {
                setScrolled(true);
            }}
        >
            <div
                className={`w-full flex flex-row items-center justify-between sticky top-0 z-20 transition-all duration-300 ease-in-out ${
                    scrolled ? "bg-white shadow-lg p-2 rounded-b-xl" : "bg-transparent"
                }`}
            >
                <div className="">
                    <RegionSelect
                        country={country}
                        hideRegion={true}
                        onCountryChange={handleCountryChange}
                    />
                </div>
                <div className="flex flex-row items-center gap-4">
                    <Dropdown
                        label="Select party type"
                        dropdowns={initialPartyTypes}
                        selectedDropdown={partyType}
                        onSelect={handlePartyTypeChange}
                    />
                    <Tooltip message="Reset all">
                        <IconButton
                            icon="solar:restart-bold-duotone"
                            onClick={handleResetAll}
                        />
                    </Tooltip>
                </div>
            </div>
            <PartyCardGroup parties={availableParties}/>
        </div>
    );
};

export default Parties;
