import React from "react";
import Button from "./Button";

type SubscribeBarProps = {
  className?: string;
  onClick?: () => void;
};

const SubscribeBar = ({
  className = "",
  onClick = () => {},
}: SubscribeBarProps) => {
  return (
    <div
      className={
        "h-12 flex items-center border border-gray rounded-full " + className
      }
    >
      <form
        action="https://fuse.us10.list-manage.com/subscribe/post?u=32f2983d12ae44ce73e66f86c&amp;id=2acb371a54&amp;f_id=002d21e2f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_self"
        className="flex items-center w-full"
      >
        <input
          className="w-full h-full px-6 text-sm font-medium rounded-full focus:outline-none"
          placeholder="Enter Your Email"
          name="EMAIL"
          id="mce-EMAIL"
        />
        <input type="hidden" name="tags" value="13473456" readOnly />
        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_32f2983d12ae44ce73e66f86c_2acb371a54"
            tabIndex={-1}
            value=""
            readOnly
          />
        </div>
        <Button
          text="Subscribe"
          className="bg-black font-medium text-white rounded-full me-1"
          type="submit"
        />
      </form>
    </div>
  );
};

export default SubscribeBar;
