import styled from 'styled-components'
import { Color, Shadow, theme } from '../../../styles/theme'
import * as Styles from '../../styled-components'
import Icon from '@mdi/react'
import { mdiClose, mdiGithub } from '@mdi/js'

export const Background = styled.div`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  transition: 0.5s;
  pointer-events: none;
  z-index: 1000;
  &.open {
    backdrop-filter: blur(10px);
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.65);
  }
`

export const Wrapper = styled(Styles.Col)`
  position: absolute;
  transform: translate(-50%, -50%) scale(0.5);
  left: 50%;
  top: 50%;
  min-width: 500px;
  pointer-events: none;
  opacity: 0;
  transition: 0.25s;
  border-radius: ${theme.borderRadius}px;
  background-color: hsl(${Color.pick('secondary').get()});
  box-shadow: ${Shadow.pick('spread')};
  &.open {
    pointer-events: all;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

export const Header = styled(Styles.H3)`
  color: hsl(${Color.pick('brand').get()});
`

export const CloseButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  background: none;
  border: 0;
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
  color: inherit;
  transition: 0.05s;
  border-radius: ${theme.borderRadius}px;
  &:hover {
    color: hsl(${Color.pick('brand').get()});
  }
  &:focus {
    outline: 0;
  }
`

const LoginDividerLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: hsl(${Color.pick('text').get()});
`
const LoginDividerText = styled.span`
  color: hsl(${Color.pick('textMuted').get()});
  user-select: none;
  margin: 0 1rem;
`
export function LoginDivider() {
  return (
    <Styles.Row className="my-6 justify-center items-center">
      <LoginDividerLine />
      <LoginDividerText>OR</LoginDividerText>
      <LoginDividerLine />
    </Styles.Row>
  )
}

const OAuthButton = styled(Styles.PrimaryButton).attrs({ type: 'button' })`
  width: 100%;
`
const OAuthIcon = styled(Icon)`
  margin-left: 0.5rem;
  width: 2rem;
  height: 2rem;
`
export const GitHubButton = styled(OAuthButton)`
  background-color: hsl(0, 0%, 6%);
  color: hsl(${Color.pick('text').get()});
  &:hover {
    background-color: hsl(0, 0%, 2%);
  }
`

type OAuthClick = React.MouseEventHandler<HTMLButtonElement> &
  React.MouseEventHandler<HTMLAnchorElement>
export function GitHubLogin({ onClick }: { onClick: OAuthClick }) {
  return (
    <GitHubButton
      as="a"
      href={`${process.env.REACT_APP_SERVER_URL}/api/oauth/github`}
      onClick={onClick}
    >
      <span>Login with GitHub</span>
      <OAuthIcon path={mdiGithub} />
    </GitHubButton>
  )
}

export function Close({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <CloseButton onClick={onClick}>
      <Icon path={mdiClose} />
    </CloseButton>
  )
}

export const Main = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`

export const Footer = styled.div`
  background-color: hsl(${Color.pick('secondary').get()});
  padding: 2rem;
  box-shadow: ${Shadow.pick('spread')};
`
