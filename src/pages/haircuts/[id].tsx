
import Head from "next/head";
import { Button, Flex, Heading, Text, Input, useMediaQuery, Switch, Stack } from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { setupAPIClient } from "@/services/api";
import { ChangeEvent, useState } from "react";
import Router from "next/router";

interface HaircutProps {
    id: string;
    name: string;
    price: string | number;
    status: boolean;
    user_id: string;
}

interface subscriptionProps {
    id: string;
    status: string;
}

interface EditHaircutProps {
    haircut: HaircutProps;
    subscription: subscriptionProps | null;
}

export default function EditHaircut({ subscription, haircut }: EditHaircutProps) {

    const [name, setName] = useState(haircut ? haircut?.name : "");
    const [price, setPrice] = useState(haircut ? haircut?.price : "");
    const [status, setStatus] = useState(haircut?.status);
    const [disabledHaircut, setDisabledHaircut] = useState(haircut?.status ? "disabled" : "enable");

    const [isMobile] = useMediaQuery("(max-width: 500px)");

    function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.value === "disabled") {
            setDisabledHaircut("enable");
            setStatus(false);
        }else {
            setDisabledHaircut("disabled");
            setStatus(true);
        }
    }

    async function handleUpdate() {
        if(name === "" || price === "") {
            return;
        }

        try {
            const apiClient = setupAPIClient();
            await apiClient.put("/haircut", {
                name: name,
                price: Number(price),
                status: status,
                haircut_id: haircut?.id,
            });
            Router.push("/haircuts");

        }catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <Head>
                <title>Barber - Editando Corte</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar>
                <Flex direction='column' alignItems="flex-start" justifyContent="flex-start">
                    <Flex
                        direction={isMobile ? "column" : "row"}
                        w="100%"
                        align={isMobile ? "flex-start" : "center"}
                        mb={isMobile ? 4 : 0}
                    >
                        <Link href="/haircuts">
                            <Flex direction="row" alignItems="center" mr={4}>
                                <FiChevronLeft size={21} color="white" />
                                <Button bg="transparent" _hover={{ bg: "transparent" }} color="gray.100">Voltar</Button>
                            </Flex>
                        </Link>

                        <Heading
                            color="orange.900"
                            fontSize={isMobile ? "28px" : "2xl"}
                        >
                            Editar corte
                        </Heading>
                    </Flex>

                    <Flex
                        maxW="1024px"
                        bg="barber.400"
                        w="100%"
                        mx="auto"
                        align="center"
                        justify="center"
                        direction="column"
                        mt={5}
                        pb={10}
                        pt={10}
                    >
                        <Heading color="gray.100" fontSize={isMobile ? "22px" : "2xl"} mb={4}>Editando Corte</Heading>

                        <Flex w="100%" align="center" justify="center" mb={4}>
                            <Input
                                color="gray.100"
                                size="md"
                                placeholder="Nome do corte"
                                width="85%"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Flex>

                        <Flex w="100%" align="center" justify="center" mb={4}>
                            <Input
                                color="gray.100"
                                size="md"
                                placeholder="Valor do corte"
                                width="85%"
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Flex>

                        <Stack w="85%" align="center" direction="row" mb={5} mt={2}>
                            <Text
                                color="gray.100"
                                mr={1}
                            >
                                Desativar corte
                            </Text>
                            <Switch
                                colorScheme="red"
                                size="lg"
                                value={disabledHaircut}
                                isChecked={disabledHaircut === "disabled" ? false : true }
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e) }
                            />
                        </Stack>

                        <Button
                            w="85%"
                            bg="button.cta"
                            _hover={{ bg: "orange.900" }}
                            mb={5}
                            disabled={subscription?.status !== "active"}
                            onClick={handleUpdate}
                        >   Salvar
                        </Button>

                        {subscription?.status !== "active" && (
                            <>
                                <Flex direction="row" gap={2} fontSize={14}>
                                    <Link href="/planos">
                                        <Text color="#31fb6a">Seja premium</Text>
                                    </Link>
                                    <Text color="white">e tenha todos os acessos liberados</Text>
                                </Flex>
                            </>
                        )}
                    </Flex>

                </Flex>
            </Sidebar>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const { id } = ctx.params;
    //console.log(id);

    try {
        const apiClient = setupAPIClient(ctx);
        const check = await apiClient.get("/haircut/check", {
        });

        const response = await apiClient.get("/haircut/detail", {
            params: {
                haircut_id: id,
            }
        });
        //console.log(response.data);

        return {
            props: {
                haircut: response.data,
                subscription: check.data?.subscriptions,
            }
        }


    } catch (err) {
        console.log(err);

        return {
            redirect: {
                destination: "/haircuts",
                permanent: false,
            }
        }
    }
});