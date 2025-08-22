const Footer = function () {
  return (
    <footer className="flex flex-col py-10 gap-20 mt-[110px]">
      <section className="flex justify-between items-center">
        <h1
          className="text-center text-[48px] font-bold leading-[100%] font-[Oxanium]
             bg-[linear-gradient(90deg,#F88A01_-0.1%,#F66E14_92.2%)]
             bg-clip-text text-transparent"
        >
          GameGrid
        </h1>

        <div className=" flex flex-col gap-4 self-start">
          <h3
            className="text-[24px] font-semibold leading-[32px] font-[Oxanium]
             bg-[linear-gradient(90deg,#F88A01_-0.1%,#F66E14_92.2%)]
             bg-clip-text text-transparent"
          >
            Contact Us
          </h3>
          <div className="flex gap-4">
            <img src="/Icons/Group-4.svg" alt="" />
            <p>welcome@GameGrid.io</p>
          </div>
          <div className="flex gap-4">
            <img src="/Icons/Group-3.svg" alt="" />
            <p className="max-w-[300px]">
              138 Robinson Road #02-50 Oxley Tower Singapore (068906)
            </p>
          </div>
        </div>

        <div className=" flex flex-col gap-4">
          <h3
            className="text-[24px] font-semibold leading-[32px] font-[Oxanium]
             bg-[linear-gradient(90deg,#F88A01_-0.1%,#F66E14_92.2%)]
             bg-clip-text text-transparent"
          >
            Quicklink
          </h3>
          <p>How to Earn</p>
          <p>How it works</p>
          <p>Road map</p>
        </div>

        <div className=" flex flex-col gap-4 self-start">
          <h3
            className="text-[24px] font-semibold leading-[32px] font-[Oxanium]
             bg-[linear-gradient(90deg,#F88A01_-0.1%,#F66E14_92.2%)]
             bg-clip-text text-transparent"
          >
            Socials
          </h3>
          <div className="flex gap-4">
            <img src="/Icons/Group 165.svg" alt="" />
            <img src="/Icons/Group 165.svg" alt="" />
            <img src="/Icons/Group 162.svg" alt="" />
            <img src="/Icons/Group 163.svg" alt="" />
          </div>
        </div>
      </section>
      <p className="w-[100%] text-center">Copyright © 2022 Metavill</p>
    </footer>
  );
};

export default Footer;
