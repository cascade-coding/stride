import { cn } from "@/lib/utils";
import React from "react";

const NoteJournal = ({ className = "", fillColor = "" }) => {
  return (
    <>
      <svg
        className={cn("w-12 h-12", className)}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.3522 39.9179C25.9016 40.0457 25.952 40.7655 25.4168 40.9439L22.2568 41.9839C14.3168 44.5439 10.1368 42.4039 7.55678 34.4639L4.99678 26.5639C2.43678 18.6238 4.55678 14.4238 12.4968 11.8638L13.5448 11.5168C14.3505 11.2499 15.1346 12.0581 14.9058 12.8754C14.7924 13.2805 14.6833 13.7034 14.5768 14.1438L12.6168 22.5239C10.4168 31.9439 13.6368 37.1439 23.0568 39.3839L25.3522 39.9179Z"
          className={cn("fill-muted", fillColor)}
        />
        <path
          d="M34.3404 6.41709L31.0004 5.63709C24.3204 4.05709 20.3404 5.35709 18.0004 10.1971C17.4004 11.4171 16.9204 12.8971 16.5204 14.5971L14.5604 22.977C12.6004 31.337 15.1804 35.457 23.5204 37.437L26.8804 38.237C28.0404 38.517 29.1204 38.697 30.1204 38.777C36.3604 39.377 39.6804 36.457 41.3604 29.237L43.3204 20.877C45.2804 12.5171 42.7204 8.37709 34.3404 6.41709ZM30.5804 26.657C30.4004 27.337 29.8004 27.777 29.1204 27.777C29.0004 27.777 28.8804 27.757 28.7404 27.737L22.9204 26.257C22.1204 26.057 21.6404 25.237 21.8404 24.437C22.0404 23.637 22.8604 23.157 23.6604 23.357L29.4804 24.837C30.3004 25.037 30.7804 25.857 30.5804 26.657ZM36.4404 19.8971C36.2604 20.577 35.6604 21.017 34.9804 21.017C34.8604 21.017 34.7404 20.997 34.6004 20.977L24.9004 18.5171C24.1004 18.3171 23.6204 17.4971 23.8204 16.6971C24.0204 15.8971 24.8404 15.4171 25.6404 15.6171L35.3404 18.0771C36.1604 18.2571 36.6404 19.0771 36.4404 19.8971Z"
          className={cn("fill-muted", fillColor)}
        />
      </svg>
    </>
  );
};

export default NoteJournal;
