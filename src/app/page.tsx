/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import Head from 'next/head';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";

import Slider from "@/components/Slider";
import Pill from "@/components/Pill";
import Icon from "@/components/Icon";
import { API_PATH } from "@/config";
import {
  ACCESSIBILITY_MAP,
  ACCESSIBILITY_REVERSE_MAP,
  PRICE_MAP,
  PRICE_REVERSE_MAP,
  TYPE_BG_MAP,
  TYPE_ICON_MAP,
} from "@/lib/constants";
import { Activity, User } from "@/lib/types";

interface ProfileFormProps {
  user?: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  postUser: (user: User) => void;
  className?: string;
}

interface ProfileFormHandle {
  hydrateUser: (user: User) => void;
}

const ProfileForm = forwardRef<ProfileFormHandle, ProfileFormProps>((props, ref) => {
  const { isOpen, setIsOpen, className, postUser } = props;

  const [name, setName] = useState<string>("");
  const [accVal, setAccVal] = useState<number>(0);
  const [priceVal, setPriceVal] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    hydrateUser(user: User) {
      if (!user) {
        return;
      }
      setName(user.name);
      setAccVal(ACCESSIBILITY_MAP[user.accessibility]);
      setPriceVal(PRICE_MAP[user.price]);
    }
  }));

  const submitHandler = () => {
    if (accVal == null || priceVal == null) {
      return;
    }
    const newUser: User = {
      name,
      accessibility: ACCESSIBILITY_REVERSE_MAP[accVal],
      price: PRICE_REVERSE_MAP[priceVal],
    };
    postUser(newUser);
    setIsOpen(false);
  };

  return (
    <div className={className} css={css`
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      border-top: 1px solid #fff;
      padding: 20px;
      transform: translateY(${isOpen ? "0%" : "100%"});
      transition: transform 0.2s ease-in-out, background 1s ease-in-out;
    `}>
      <h3>My name is</h3>
      <div>
        <input
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          css={css`
            border: 0;
            background: none;
            outline: none;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            text-align: center;
            border-bottom: 1px solid #fff;

          `}
        />
      </div>
      <h3 css={css`
        margin-top: 30px;
      `}>
        I'm looking for activities with
      </h3>
      <div css={css`
        display: flex;
      `}>
        <Slider
          css={css`
            margin-right: 20px;
          `}
          label="Accessibility"
          max={1}
          step={0.5}
          value={accVal}
          onChange={(evt) => setAccVal(Number(evt.target.value))}
        />
        <Slider
          label="Price"
          max={1}
          step={0.5}
          value={priceVal}
          onChange={(evt) => setPriceVal(Number(evt.target.value))}
        />
      </div>
      <div css={css`
        display: flex;
        margin-top: 30px;
      `}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          css={css`
            display: flex;
            align-items: center;
            padding: 10px;
            margin-right: 20px;
          `}
        >
          <Icon code="close" css={css`font-size: 30px;`}/>
        </button>
        <button
          onClick={submitHandler}
          css={css`
            display: flex;
            align-items: center;
            padding: 10px;
          `}
        >
          <Icon code="check" css={css`font-size: 30px;`}/>
        </button>
      </div>
    </div>
  )
});

interface ActivityProps {
  activity: Activity;
}

function Activity(props: ActivityProps) {
  const { accessibility, price, type, activity, link } = props.activity;
  const iconCode = TYPE_ICON_MAP[type] || "self_improvement";
  const accVal = ACCESSIBILITY_MAP[accessibility] || 0;
  const priceVal = PRICE_MAP[price] || 0;

  return (
    <div css={css`
      position: relative;
      line-height: 1;
    `}>
      <Icon code={iconCode} css={css`
        font-size: 180px;
        position: absolute;
        opacity: 0.1;
        pointer-events: none;
        top: -10%;
        left: -120px;
      `}/>
      <div css={css`
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      `}>
        <p css={css`
          font-weight: bold;
          margin-right: 24px;
        `}>
          {type}
        </p>
        <Pill label="Accessibility" progress={accVal}/>
        <Pill label="Price" progress={priceVal}/>
      </div>
      <h1>{activity}</h1>
    </div>
  );
}

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const [activity, setActivity] = useState<Activity>();
  type ProfileFormHandle = React.ElementRef<typeof ProfileForm>;
  const formRef = useRef<ProfileFormHandle>(null);

  const bg = activity && activity.type ? TYPE_BG_MAP[activity.type] : "#65737d";
  const name = user ? user.name : "Guest";

  const fetchActivity = async () => {
    const resp = await fetch(API_PATH + "/activity");
    const data = await resp.json();
    setActivity(data);
  };

  const fetchUser = async () => {
    const resp = await fetch(API_PATH + "/user");
    const data = await resp.json();
    setUser(data);
    formRef.current?.hydrateUser(data);
  };

  const postUser = async (user: User) => {
    await fetch(API_PATH +  "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    fetchUser();
    fetchActivity();
  };

  useEffect(() => {
    fetchUser();
    fetchActivity();
  }, []);

  return (
    <main css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: ${bg};
      color: #fff;
      transition: background 1s ease-in-out;
    `}>
      <Head>
        <title>Bored?</title>
      </Head>
      <div css={css`
        margin: 0 20px;
        transform: translateY(${isFormOpen ? -50 : 0}%);
        transition: transform 0.2s ease-in-out;
      `}>
        {activity && activity.error ? <h1>{activity.error}</h1> : null}
        {activity && activity.type ? <Activity activity={activity}/> : null}
        <div css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}>
          <div css={css`
            display: flex;
            align-items: center;
          `}>
            <button
              onClick={fetchActivity}
              css={css`
                display: flex;
                align-items: center;
                margin: 0 36px 0 0;
              `}
            >
              <Icon code="skip_next" css={css`font-size: 36px;`}/>
            </button>
            <button
              css={css`
                display: flex;
                align-items: center;
              `}
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              <Icon code="sentiment_very_satisfied" css={css`font-size: 36px;`}/>
              <div css={css`margin-left: 6px;`}>
                {name}
              </div>
            </button>
          </div>
        </div>
      </div>
      <ProfileForm
        css={css`
          background: ${bg};
        `}
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        user={user}
        postUser={postUser}
        ref={formRef}
      />
    </main>
  )
}
