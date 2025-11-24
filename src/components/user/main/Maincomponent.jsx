export default function Maincompoenent({ num, title, text, link, img1, img2 }) {
  return (
    <div className="flex flex-col gap-[14px] px-5 py-[30px]">
      <div className="text-[25px] flex px-5 gap-[33px]">
        <p className="text-logocolor">{num}</p>
        <p className="text-titleblack">{title}</p>
      </div>
      <div className="text-textblack text-[20px] bg-sky-light-f rounded-[10px] px-[35px] py-4">
        <p>{text}</p>
        <p className="underline">{link}</p>
        <div className="flex gap-5">
          <img src={img1} />
          <img src={img2} />
        </div>
      </div>
    </div>
  );
}
