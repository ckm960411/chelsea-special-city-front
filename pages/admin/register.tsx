import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { meState, tokenState } from '../../store';
import { UserStatus } from '../../utils/type/user';
import { RegisterForm } from '../../utils/type/player';
import SpaceY from '../../components/common/SpaceY';
import Layout from '../../components/layout/Layout';
import PlayerPositionField from '../../components/register/PlayerPositionField';
import PlayerDetailPositoinField from '../../components/register/PlayerDetailPositoinField';
import PlayerPhotoField from '../../components/register/PlayerPhotoField';
import PlayerNameField from '../../components/register/PlayerNameField';
import PlayerBackNumberField from '../../components/register/PlayerBackNumberField';
import PlayerNationalTeamField from '../../components/register/PlayerNationalTeamField';
import PlayerBirthPlaceField from '../../components/register/PlayerBirthPlaceField';
import PlayerBirthDateField from '../../components/register/PlayerBirthDateField';
import PlayerHeightField from '../../components/register/PlayerHeightField';
import { registerPlayer, updatePlayer } from '../../api/players';
import PlayerSearch from '../../components/player/PlayerSearch';

const initialRegisterForm = {
  profileImg: '',
  name: '',
  backNumber: null,
  position: null,
  detailPosition: [],
  nationalTeam: '',
  birthPlace: '',
  birthDate: '',
  height: 0,
};

const RegisterPlayerPage = () => {
  const router = useRouter();
  const me = useRecoilValue(meState);
  const token = useRecoilValue(tokenState);

  const [registerForm, setRegisterForm] = useState<RegisterForm>(initialRegisterForm);
  const [isEditing, setIsEditing] = useState(false);
  const [playerId, setPlayerId] = useState(0);

  const handleSubmit = async () => {
    const { backNumber, position, ...rest } = registerForm;
    if (isEditing) {
      // UPDATE
      if (backNumber && position && playerId) {
        updatePlayer(playerId, {
          backNumber,
          position,
          ...rest,
        })
          .then(() => {
            alert('?????? ????????? ??????????????????!');
            setRegisterForm(initialRegisterForm);
            setIsEditing(false);
          })
          .catch(() => alert('????????? ??????????????????. ?????? ????????? ?????????.'));
      }
    } else {
      // CREATE
      if (backNumber && position) {
        await registerPlayer({
          backNumber,
          position,
          ...rest,
        })
          .then(() => {
            alert('?????? ????????? ??????????????????!');
            setRegisterForm(initialRegisterForm);
          })
          .catch(() => alert('????????? ??????????????????. ?????? ????????? ?????????.'));
      } else {
        alert('?????? ???????????? ????????? ??????????????????!');
      }
    }
  };

  useEffect(() => {
    if (!token) {
      router.push('/');
    } else if (me) {
      if (me.userStatus !== UserStatus.ADMIN) router.push('/');
    }
  }, [me, router, token]);

  useEffect(() => {
    if (!isEditing) setPlayerId(0);
  }, [isEditing]);

  return (
    <div className="mx-auto max-w-md px-16px">
      <SpaceY height="16px" />
      <div className="flex flex-col gap-16px">
        <PlayerSearch
          setRegisterForm={setRegisterForm}
          setIsEditing={setIsEditing}
          setPlayerId={setPlayerId}
        />
        <PlayerPhotoField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerNameField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerBackNumberField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerPositionField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerDetailPositoinField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerNationalTeamField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerBirthPlaceField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerBirthDateField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerHeightField registerForm={registerForm} setRegisterForm={setRegisterForm} />
      </div>
      <SpaceY height="24px" />
      <button
        onClick={handleSubmit}
        className="w-full rounded-sm bg-chelsea py-12px text-18px font-bold text-white"
      >
        {isEditing ? 'UPDATE' : 'REGISTER'}
      </button>
      <SpaceY height="80px" />
    </div>
  );
};

export default RegisterPlayerPage;

RegisterPlayerPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
