import { ProjectsDropdownMenu } from './projects-dropdown-menu';
import { PeriodButtonGroup } from './period-button-group';
import { CustomPeriodsPicker } from './custom-periods-picker';
import { EventsTable } from './events-table';
import { Pagination } from './pagination';
import { TotalEventCountText } from './total-event-count-text';

export const HomePage = () => {
  return (
    <div className="h-screen p-5 flex flex-col justify-between gap-5">
      <div className="basis-10 flex gap-4 items-center">
        <ProjectsDropdownMenu />
        <PeriodButtonGroup />
        <CustomPeriodsPicker />
      </div>
      <div className="overflow-y-auto flex-auto">
        <div className="mb-3">
          <TotalEventCountText />
        </div>
        <EventsTable />
      </div>
      <div className="basis-10 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};
