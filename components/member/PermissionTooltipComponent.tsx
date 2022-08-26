export const PermissionTooltipComponent = () => {
  return (
    <div className="absolute top-[10px] left-0 right-0 w-[180px] z-50 bg-[white] shadow-lg drop-shadow rounded-3xl">
      <div className="p-[10px]">
        <div className="py-1 text-black">
          <div className="font-bold 3xl:text-xl">Profile Owner</div>
          <div className="3xl:text-xl">
            Profile administrator {"\n"} Member administrator
          </div>
        </div>
        <div className="py-1 text-black">
          <div className="font-bold 3xl:text-xl">Admin</div>
          <div className="3xl:text-xl">
            Profile administrator cannot add new members
          </div>
        </div>
      </div>
    </div>
  );
};
