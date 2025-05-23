import { useEffect, useState } from "react";
import globeIcon from "../assets/globe.svg";
import dollarIcon from "../assets/dollar-sign.svg";
import dummyData from "../data/dummyData";
import Button from "../components/Button";
import JobDetails from "./JobDetails";
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  resetFetchedJobs,
  setFetchedJobs,
} from "../store/reducers/globalReducer";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  KRW: "₩",
  GBP: "£",
};

function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const dispatch = useDispatch();
  const { jobs = [] } = useSelector((state) => state.globalState);

  async function queryJobs() {
    try {
      const {
        data: { jobs },
      } = await api.get(endpoints.JOBS);
      console.log({ jobs });
      dispatch(setFetchedJobs(jobs));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    queryJobs();
  }, []);

  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="p-8 space-y-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-[#f6f5f5] p-6 rounded-lg shadow-md cursor-pointer hover:bg-[#EEEEEE] transition"
          onClick={() => setSelectedJob(job)}
        >
          <span className="text-gray-600">{job.title || "-"}</span>
          <h2 className="text-2xl font-semibold">{job.title || "-"}</h2>

          <div className="flex items-center gap-2 mt-2">
            <img src={globeIcon} alt="Location" className="w-4 h-4" />
            <span className="text-[14px] text-gray-700">
              {job.location || "-"}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-700">
              {currencySymbols[job?.currency || "USD"]}
            </span>
            <span className="text-[14px] text-gray-700">
              {job?.wage_min + " ~ " + job?.wage_max || "-"}{" "}
              {job.currency || "-"} / {job.rate || "-"}
            </span>
          </div>

          <div className="flex mt-3 justify-between">
            <div className="flex gap-4">
              {job.job_type?.split(", ").map((el, i) => (
                <Button key={i} name={el} />
              ))}
            </div>
            <div>
              <span className="text-[14px] text-gray-600">
                Job Posted:{" "}
                {moment(job?.created_at).format("YYYY.MM.DD hh:mm A")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
