const LiveBtn = () => {
 return (
  <div className="bg-white rounded-sm h-9 gap-2 w-[70px] flex items-center justify-center relative">
   <div className="flex items-center h-full justify-center">
    <div className="border-[0.75px] border-primary-base rounded-full w-4.5 h-4.5 flex items-center justify-center ">
     <div className="w-2.5 h-2.5  animate-pulse animation-duration-1000 bg-primary-base rounded-full"></div>
    </div>
   </div>
   <span className="text-neutral-light text-base">live</span>
  </div>
 );
};

export default LiveBtn;
