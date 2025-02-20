import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import {
  FileDown,
  Mail,
  MapPinHouse,
  Pencil,
  Phone,
  University,
  UserPen,
} from "lucide-react";
import TooltipSocialLinks from "./TooltipSocialLinks";
import { Separator } from "../ui/separator";
import Overlay from "../Overlay";

const PortfolioCard = () => {
  const student = {
    firstName: "EL BANOURI",
    lastName: "Achraf",
    profileTitle: "Full Stack Developer",
    email: "elbanouri.achraf10@gmail.com",
    tel: "0634807687",
    address: "hay al mandar al jamil , rue andaleb , berrechid",
    githubLink: "https://github.com/AchrafELBANOURI",
    linkedinLink: "https://github.com/AchrafELBANOURI",
    portfolioLink: "https://github.com/AchrafELBANOURI",
    cvLink: "https://github.com/AchrafELBANOURI",
    school: {
      name: "Ecole Nationale des Sciences Appliquees d'Agadir",
      image:
        "https://imgs.search.brave.com/cllfSwAH-XW4sx3vO2M3D9J5x1jWN6IZf_F7g_ycA7A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL1UvdWl6LWli/bi16b2hyLWxvZ28t/OUM5NzFDMTkyQy1z/ZWVrbG9nby5jb20u/cG5n",
    },
  };

  const links = {
    github: "profile/github.png",
    linkedin:
      "data:image/png;base64,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",
    portfolio: "profile/portfolio_link.png",
    cv: "profile/cv_link.png",
  };

  return (
    <div className="flex flex-row-reverse gap-2 w-[90%] mx-auto">
      <div className="bg-gray-50 border-primary-hover shadow-sm py-4 px-5 rounded-lg w-[30%]">
        <div className="flex-row-reverse flex justify-around items-center">
          <div className="flex flex-col items-center gap-3">
            <ProfileAvatar
              className="w-56 h-56 relative overflow-hidden group"
              avatarImage={"https://github.com/shadcn.png"}
              avatarFallback={"CN"}
              overlay={<Overlay children={<UserPen className="w-20 h-20" />} />}
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                {student.lastName + " " + student.firstName}
              </h1>
              <h3 className="font-mono">{student.profileTitle}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border-primary-hover py-7 px-10 shadow-sm rounded-lg w-[70%]">
        <div className="flex flex-col gap-5 justify-between h-full text-lg">
          <div className="flex flex-col gap-3">
            <div className="flex justify-start items-center gap-3">
              <University className="mb-2" />
              <p>{student.school.name}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Mail />
              <p>{student.email}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Phone />
              <p>{student.tel}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <MapPinHouse />
              <p>{student.address}</p>
            </div>
          </div>
          <Separator className="h-[1px] bg-primary-hover mt-4" />
          <div className="flex w-full justify-between items-center">
            {student.githubLink && (
              <TooltipSocialLinks
                tooltipStyling="bg-[#000000] mt-2 text-white"
                tooltipContent="Github"
                triggerContent={
                  <a href={student.githubLink}>
                    <img
                      src={links.github}
                      alt="github"
                      width={"40rem"}
                      className="grayscale hover:grayscale-0 hover:scale-125 duration-200"
                    />
                  </a>
                }
              />
            )}
            {student.linkedinLink && (
              <TooltipSocialLinks
                tooltipStyling="mt-2 bg-[#0077b7] text-white"
                tooltipContent="LinkedIn"
                triggerContent={
                  <a href={student.linkedinLink}>
                    <img
                      src={links.linkedin}
                      alt="linkedIn"
                      width={"30rem"}
                      className="grayscale hover:grayscale-0 hover:scale-125 duration-200"
                    />
                  </a>
                }
              />
            )}
            {student.cvLink && (
              <TooltipSocialLinks
                tooltipStyling="mt-2 bg-[#18a0ff] text-white"
                tooltipContent="CV"
                triggerContent={
                  <a href={student.cvLink}>
                    <img
                      src={links.cv}
                      alt="CV"
                      width={"35rem"}
                      className="grayscale hover:grayscale-0 hover:scale-125 duration-200"
                    />
                  </a>
                }
              />
            )}
            {student.portfolioLink && (
              <TooltipSocialLinks
                tooltipStyling="mt-2 bg-[#558ac8] text-white"
                tooltipContent="portfolio"
                triggerContent={
                  <a href={student.portfolioLink}>
                    <img
                      src={links.portfolio}
                      alt="Portfolio"
                      width={"30rem"}
                      className="grayscale hover:grayscale-0 hover:scale-125 duration-200"
                    />
                  </a>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PortfolioCard;
