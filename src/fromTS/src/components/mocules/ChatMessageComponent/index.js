import { Avatar, Box, Typography } from '@material-ui/core';
import styled from 'styled-components';

const ChatMessage = styled.div`
  margin-top: 10px;
  text-align: ${(props) => props.position};
`;

const ChatMessageInner = styled.div`
  display: inline-block;
`;

const ChatMessageTime = styled(Typography)`
  text-align: right;
  opacity: 0.8;
`;

const ChatMessageAvatar = styled(Avatar)`
  position: relative;
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right: ${(props) => props.theme.spacing(2)}px;
`;

const ChatMessageBubble = styled.div`
  display: inline-block;
  margin-right: auto;
  background: ${(props) => (props.highlighted ? props.theme.palette.primary.main : props.theme.palette.action.hover)};
  color: ${(props) => (props.highlighted ? props.theme.palette.common.white : props.theme.palette.text.primary)};
  border-radius: 3px;
  padding: ${(props) => props.theme.spacing(2)}px;
  margin-bottom: ${(props) => props.theme.spacing(1)}px;
  ${(props) => props.theme.shadows[1]};
`;

const ChatMessageBubbleName = styled(Typography)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

const ChatMessageComponent = ({ name, message, time, avatar, position = 'left' }) => (
  <ChatMessage position={position}>
    <ChatMessageInner>
      <ChatMessageAvatar src={avatar} />
      <ChatMessageBubble highlighted={position === 'right'}>
        <Box>
          <ChatMessageBubbleName variant="body1">{name}</ChatMessageBubbleName>
        </Box>
        <Typography variant="body2">{message}</Typography>
      </ChatMessageBubble>
      <ChatMessageTime variant="body2">{time}</ChatMessageTime>
    </ChatMessageInner>
  </ChatMessage>
);

export default ChatMessageComponent;
