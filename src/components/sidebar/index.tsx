import { ReactNode, useState } from "react";
import { FiScissors, FiClipboard, FiSettings, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  DrawerBody,
} from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const linkItems: Array<LinkItemProps> = [
  { name: "Agenda", icon: FiScissors, route: "/dashboard" },
  { name: "Cortes", icon: FiClipboard, route: "/haircuts" },
  { name: "Minha Conta", icon: FiSettings, route: "/profile" },
];

export function Sidebar({ children }: { children: ReactNode }) {

  const { open, onOpen, onClose } = useDisclosure();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Box
      minH="100vh"
      bg="barber.900"
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <DrawerRoot size="full" open={open} onOpenChange={(e) => setIsDrawerOpen(e.open)} placement="start">
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <DrawerContent bg="barber.900">
            <DrawerHeader>
              <Flex justify="space-between" alignItems="center">
                <Flex direction="row">
                  <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">Bar</Text>
                  <Text color="button.cta" fontSize="2xl" fontFamily="monospace" fontWeight="bold">ber</Text>
                </Flex>
                <CloseButton onClick={onClose} />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Box px={4}>
                {linkItems.map(link => (
                  <NavItem icon={link.icon} route={link.route} key={link.name}>
                    {link.name}
                  </NavItem>
                ))}
              </Box>
            </DrawerBody>
          </DrawerContent>

        </DrawerTrigger>
      </DrawerRoot>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg="barber.400"
      borderRight="1px"
      borderRightColor="gray.700"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      color="white"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" mx="8">
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" flexDirection="row">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">Bar</Text>
            <Text color="button.cta" fontSize="2xl" fontFamily="monospace" fontWeight="bold">ber</Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {linkItems.map(link => (
        <NavItem icon={link.icon} route={link.route} key={link.name}>
          {link.name}
        </NavItem>
      ))}

    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        alignItems="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "barber.900",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon mr={4} fontSize="16" as={icon} _groupHover={{ color: "white" }} />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg="barber.400"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" color="white" onClick={onOpen} aria-label="open menu" >
        <FiMenu />
      </IconButton>
      <Flex flexDirection="row" ml={5}>
        <Text fontSize="2xl" color="white" fontFamily="monospace" fontWeight="bold">Bar</Text>
        <Text color="button.cta" fontSize="2xl" fontFamily="monospace" fontWeight="bold">ber</Text>
      </Flex>
    </Flex>
  )
}