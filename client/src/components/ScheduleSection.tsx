import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const ScheduleSection = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Festival schedule data - using the same events from the highlights
  const scheduleEvents = [
    {
      title: t.openingNight,
      time: t.openingTime,
      category: t.specialEvent,
      categoryClass: "text-[#b91c48]",
    },
    {
      title: t.masterclass,
      time: t.masterclassTime,
      category: t.workshopLabel,
      categoryClass: "text-[#19b999]",
    },
    {
      title: t.futureCinema,
      time: t.futureTime,
      category: t.panelLabel,
      categoryClass: "text-[#e39f0a]",
    },
    {
      title: t.audioWorkshop,
      time: t.audioWorkshopTime,
      category: t.workshopLabel,
      categoryClass: "text-[#19b999]",
    },
  ];

  return (
    <section id="schedule" className="section-padding bg-white">
      <div className="container-responsive">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins mb-4 text-gray-900">
            {t.festivalSchedule}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-[#e39f0a] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t.scheduleDescription}
          </p>
        </div>

        {/* Schedule List */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {scheduleEvents.map((event, index) => (
                <li key={index} className="p-5 sm:p-6 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className={`text-sm font-semibold ${event.categoryClass} block sm:inline sm:mr-3`}>
                        {event.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold mt-1 sm:mt-0">
                        {event.title}
                      </h3>
                    </div>
                    <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm text-gray-700 border border-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#b91c48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {event.time}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;