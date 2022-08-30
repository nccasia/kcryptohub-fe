export const InviteStatusTooltipComponent = () => {
  return (
    <div className="absolute top-[9px] left-0 right-0 w-[180px] z-50 bg-[white] shadow-lg drop-shadow rounded-3xl">
      <div className="p-[10px]">
        <div className="py-1 text-black">
          <div className="font-bold 3xl:text-xl">Invite Pending</div>
          <div className="3xl:text-xl">
            The invite {"hasn't"} been accepted yet.
          </div>
        </div>
        <div className="py-1 text-black">
          <div className="font-bold 3xl:text-xl">Invite Expired</div>
          <div className="3xl:text-xl">Invite expire after 72 hours</div>
        </div>
      </div>
    </div>
  );
};
