import Head from "next/head";
import { Button, Flex, Heading, Text, Stack, Switch, useMediaQuery } from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import { IoMdPricetag } from "react-icons/io";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { setupAPIClient } from "@/services/api";

interface HaircutsItem {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps {
    haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {

    const [isMobile] = useMediaQuery("(max-width: 500px)");

    const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || []);
    const [disabledHaircut, setDisabledHaircut] = useState("enable");

    async function handleDisable(e: ChangeEvent<HTMLInputElement>) {
        //console.log(e.target.value);

        const apiClient = setupAPIClient();

        if(e.target.value === "disabled") {
            setDisabledHaircut("enable");
            //console.log("ativando");

            const response = await apiClient.get("/haircuts", {
               params: {
                    status: true,
               } 
            });
            setHaircutList(response.data);

        }else {
            setDisabledHaircut("disabled");
            //console.log("desativando");

            const response = await apiClient.get("/haircuts", {
                params: {
                     status: false,
                } 
             });
             setHaircutList(response.data);
        }
    }

    return (
        <>
            <Head>
                <title>Barber - Modelos de Corte</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Flex
                        direction={isMobile ? "column" : "row"}
                        w="100%"
                        alignItems={isMobile ? "flex-start" : "center"}
                        justifyContent="flex-start"
                        mb={0}>
                        <Heading
                            fontSize={isMobile ? "28px" : "2xl"}
                            mt={4}
                            mb={4}
                            mr={4}
                            color="orange.900"
                        >
                            Modelos de Corte
                        </Heading>

                        <Link href="/haircuts/new">
                            <Button
                                bg="barber.900"
                                color="gray.100"
                                borderWidth={1}
                                mb={isMobile ? 7 : 0}
                                _hover={{ bg: "barber.400" }}>
                                Cadastrar novo
                            </Button>
                        </Link>

                        <Stack ml="auto" align="center" direction="row" mb={isMobile ? 7 : 0}>
                            <Text
                                color="gray.100"
                                mr={1}
                            >
                                ATIVOS
                            </Text>
                            <Switch
                                colorScheme="green"
                                size="lg"
                                value={disabledHaircut}
                                onChange={ (e: ChangeEvent<HTMLInputElement>) => handleDisable(e)}
                                isChecked={disabledHaircut === "disabled" ? false : true}
                            />
                        </Stack>
                    </Flex>

                    {haircutList.map(haircut => (
                        <Link key={haircut.id} href={`/haircuts/${haircut.id}`} legacyBehavior >
                            <Flex
                                mt={2}
                                color="gray.100"
                                w="100%"
                                cursor="pointer"
                                p={4}
                                bg="barber.400"
                                direction={isMobile ? "column" : "row"}
                                alignItems={isMobile ? "flex-start" : "center"}
                                rounded="4"
                                mb={2}
                                justifyContent="space-between"
                            >
                                <Flex gap={3} alignItems="center" justifyContent="center">
                                    <IoMdPricetag size={28} color="#fba931" />
                                    <Text fontWeight="bold" noOfLines={2}>{haircut.name}</Text>
                                </Flex>

                                <Text fontWeight="bold" color="orange.900">R$ {haircut.price}</Text>

                            </Flex>
                        </Link>
                    ))}

                </Flex>
            </Sidebar>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get("/haircuts", {
            params: {
                status: true,
            }
        });

        //console.log(response.data);

        if (response.data === null) {
            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false,
                }
            }
        }

        return {
            props: {
                haircuts: response.data,
            }
        }

    } catch (err) {
        console.log(err);

        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            }
        }

    }
})