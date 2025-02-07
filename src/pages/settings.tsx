import Information from '@/components/Settings/information-settings';
import LocationSetting from '@/components/Settings/location-settings';
import TemplateMessages from '@/components/Settings/template-messages-settings';
import { Box, Tabs, Text, VStack } from '@chakra-ui/react';

export default function Settings() {
  return (
    <Box bgColor="white" p="3">
      <VStack display="flex" justifyContent="flex-start" align="flex-start">
        <Text fontWeight="700" fontSize="2xl" color="#2400FE">
          Seller Store
        </Text>
        <Tabs.Root defaultValue="location" w="full">
          <Tabs.List>
            <Tabs.Trigger value="information">Information</Tabs.Trigger>
            <Tabs.Trigger value="location">Location</Tabs.Trigger>
            <Tabs.Trigger value="messages">Template Messages</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="information">
            <Information />
          </Tabs.Content>
          <Tabs.Content value="location">
            <LocationSetting/>
          </Tabs.Content>
          <Tabs.Content value="messages">
            <TemplateMessages />
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Box>
  );
}
