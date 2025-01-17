/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setSideBar, setErrorMsg } from "../../state/actions";
import { addToBoard } from "../../apis";
import { StateType, sideBarState, log, error } from "../../types/types";
import { SupportButton, Subtitle, FormTemplate } from "../";
import { sideBarFormInputs } from "../../utils/formData";
import { usersDB, auth, timeStamp } from "../../firebase/firebase";

interface SideBarProps {
  open: string;
}

export const SideBarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const randomColor = require("randomcolor");
  const { canvasPosition, dataLimit } = useSelector(
    (state: StateType) => state.canvaState
  );
  const { errorMsg, sideBar } = useSelector(
    (state: StateType) => state.appState
  );
  const { userName, loginStatus } = useSelector(
    (state: StateType) => state.userState
  );

  const handleBarState = () =>
    dispatch(
      setSideBar(
        sideBar === sideBarState.close ? sideBarState.open : sideBarState.close
      )
    );

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      if (!e) return;
      if (!canvasPosition) return;
      e.preventDefault();
      const user = auth.currentUser;

      const {
        target: {
          number: { value: number },
          data: { value: data },
          info: { value: info },
        },
      } = e;

      if (number.length > 0 && data.length > 0) {
        dispatch(setErrorMsg(error.empty));
        addToBoard({
          userName: userName,
          userColor: randomColor(),
          x: canvasPosition.x + parseInt(number),
          y: canvasPosition.y + parseInt(number),
          cellData: {
            value: parseInt(data),
            info: info,
          },
        });
      } else {
        dispatch(setErrorMsg(error.fillInputs));
      }

      if (user) {
        try {
          const { uid } = user;
          const userDoc = usersDB.doc(uid);
          const userData = await userDoc.get();

          if (userData.exists) {
            await userDoc.update({
              userName: userName,
              lastVisit: timeStamp,
            });
          } else {
            await userDoc.set({
              userName: userName,
              firstVisit: timeStamp,
              lastVisit: timeStamp,
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    [userName, randomColor, canvasPosition, dispatch]
  );

  return (
    <SideBlock open={sideBar}>
      {loginStatus === log.in && (
        <>
          <SideBarContainer>
            <SupportButton onClick={handleBarState}>
              {sideBar === sideBarState.close ? "menu" : "x"}
            </SupportButton>

            {sideBar === sideBarState.open && (
              <>
                {!dataLimit && (
                  <>
                    <FormTemplate
                      buttonText="add cell"
                      handleSubmit={handleSubmit}
                      inputs={sideBarFormInputs}
                    />
                  </>
                )}

                <Subtitle>{errorMsg}</Subtitle>
              </>
            )}
          </SideBarContainer>
        </>
      )}
    </SideBlock>
  );
};

const SideBlock = styled.div<SideBarProps>`
  position: absolute;
  top: 0;
  left: ${({ open }) => (open === sideBarState.open ? "0" : "-200px")};
  height: 100%;
  background: ${({ open }) =>
    open === sideBarState.open
      ? "rgba(104, 104, 104, 0.3)"
      : "rgba(0, 0, 0, 0)"};
  transition: all ease-in-out 0.3s;
`;

const SideBarContainer = styled.div`
  padding: 15px;
  margin: 0 auto;
  width: 285px;
  text-align: right;
`;
