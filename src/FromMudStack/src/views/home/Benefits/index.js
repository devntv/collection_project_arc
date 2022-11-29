import React from "react";
import styled from "styled-components";
import { map } from "styled-components-breakpoint";
import { mb } from "styled-components-spacing";
import { Heading, Text } from "themes/components";

import IconOne from "./icons/AssetManagement";
import IconTwo from "./icons/Review";
import IconThree from "./icons/VersionControl";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 24px;
`;

const Benefit = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: 480px;
  ${map(
    {
      mobile: "0 0 100%",
      desktop: "0 0 31.5%",
    },
    (flex) => `flex: ${flex};`
  )}
  ${map(
    {
      mobile: "0 auto",
      desktop: "0",
    },
    (margin) => `margin: ${margin};`
  )}
  ${mb({ mobile: 3, desktop: "0" })};
  & > svg {
    flex: 0 0 32px;
    margin-right: 16px;
    height: 32px;
  }
  h2 {
    color: ${(props) => props.theme.colors.grey5};
    ${mb(0)};
    margin-top: 4px;
  }
  p {
    color: ${(props) => props.theme.colors.grey20};
    ${mb(0)};
  }
`;

const Benefits = () => (
  <Wrapper>
    <Benefit>
      <IconOne />
      <div>
        <Heading variant="h4" as="h2">
          Avoid hours of frustration.
        </Heading>
        <Text variant="">
          So long complicated folder hierarchies and naming conventions that
          take months to learn.
        </Text>
        <Text variant="">
          Tag, filter, search and sort so that you can find what you need— fast.
        </Text>
      </div>
    </Benefit>
    <Benefit>
      <IconTwo />
      <div>
        <Heading variant="h4" as="h2">
          Eliminate wasted work.
        </Heading>
        <Text variant="">
          Frustrated with late feedback from stakeholders that forces you back
          to the drawing board?
        </Text>
        <Text variant="">
          Continuous review in context means fewer meetings and maximizing your
          work effort.
        </Text>
      </div>
    </Benefit>
    <Benefit>
      <IconThree />
      <div>
        <Heading variant="h4" as="h2">
          Reduce risk to your games.
        </Heading>
        <Text variant="">
          Git, Perforce and Subversion were built for software engineers, not
          artists.
        </Text>
        <Text variant="">
          Finally, version control that was built for the unique needs of
          digital artists.
        </Text>
      </div>
    </Benefit>
  </Wrapper>
);

export default Benefits;
