import { Icon } from "@iconify/react";
import { Badge, Rater } from "../../components";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Party} from "../../types";
import {BACKEND_BASE_URL} from "../../constant";
import ApplicantGroup from "./ApplicantGroup";

const PartyPreview = () => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const {partyId} = useParams();

  const {user} = useSelector((state: RootState) => state.auth);
  const { parties } = useSelector((state: RootState) => state.party);

  useEffect(() => {
    if(partyId && parties.length > 0) {
      const selectedParty = parties.find(party => party._id === partyId);
      setSelectedParty(selectedParty ?? null);
    }
  }, [partyId, parties]);

  return (
    <div className="w-[80%] mx-auto py-8">
      <div className="w-full flex flex-row items-center gap-2 mb-8">
        <h1 className="text-black font-semibold text-3xl">Party Overview</h1>
        <Icon
          icon="solar:document-text-outline"
          className="text-green-500 w-8 h-8"
        />
      </div>
      <div className="w-full flex flex-1 flex-row items-start justify-between gap-14">
        <div className="flex-1 flex flex-col gap-4 bg-white/10 backdrop-blur-sm border border-white hover:border-[#c4f70f] shadow-lg rounded-xl p-6 transition-all duration-300 ease-in-out">
          <h1 className="text-lg text-black">
            <strong>{selectedParty?.title}</strong>
          </h1>
          <p className="text-sm text-black max-h-[150px] overflow-auto">
            {selectedParty?.description}
          </p>
        </div>
        <div className="py-4 px-8 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white flex flex-col">
          <div className="flex flex-row items-center gap-8">
            <img
              src={BACKEND_BASE_URL + selectedParty?.creator?.avatar ?? ''}
              alt={selectedParty?.creator?.name as any ?? ''}
              className="w-[60px] h-[60px] rounded-full border border-white shadow-lg object-cover object-center"
            />
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <h1 className="text-black text-base">
                  <strong>{selectedParty?.creator?.name}</strong>
                </h1>
                <Badge type="kyc" />
                <Badge type="premium" />
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm">{selectedParty?.creator?.region?.split(' ')[0]}</span>
                <Icon icon={`flag:${selectedParty?.creator?.country?.toLowerCase()}-4x3`} className="w-5 h-5 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 mt-2 px-2">
            <Rater rate={selectedParty?.creator?.rate ?? 0} />
            <h3 className="text-sm text-green-500">
              Total Completed: <strong>{selectedParty?.creator?.totalCompleted}</strong>
            </h3>
          </div>
        </div>
      </div>
      <div className="h-28"></div>
      {user?.membership === 'premium'
          ? <ApplicantGroup applicants={selectedParty?.applicants ?? []} />
          : (<div className='w-full flex flex-row gap-2'>
            <Icon icon='solar:info-square-broken' className='w-6 h-6 text-blue-500' />
            <p className='text-blue-500 text-lg'>To review all of your competitive applicants, you need to become a <strong>premium</strong> member</p>
          </div>)
      }
    </div>
  );
};

export default PartyPreview;
