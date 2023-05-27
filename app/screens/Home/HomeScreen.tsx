import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import { styles } from "./HomeStyles";

import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { colors } from "../../constants/theme";
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_900Black,
  SourceSansPro_700Bold,
} from "@expo-google-fonts/source-sans-pro";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "../../components/GradientText";
import axios from "axios";

interface ReportItem {
  relatorio_id: string;
  nome_paciente: string;
  medicos_relacionados: string[];
  data_nascimento: string;
  data_exame: string;
  tipo_exame: string;
}

interface AcquisitionsData {
  keys: string[];
  values: Array<string[]>;
}

interface RouteParams {
  token: string;
  dados: {
    documento: string;
    tipo: string;
    nome: string;
    sobrenome: string;
    numero_telefone: string;
    data_de_aniversario: string;
    email: string;
    foto: string | null;
    genero: string;
  };
}

const HomeScreen: React.FC = () => {
  const [ecgReports, setECGReports] = useState<ReportItem[]>([]);
  const [picniReports, setPICNIReports] = useState<ReportItem[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { token, dados } = route.params as RouteParams;
  const [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_900Black,
    SourceSansPro_700Bold,
  });

  useEffect(() => {
    fetchReports("ECG");
    fetchReports("PICnI");
  }, []);

  const fetchReports = async (examType: string) => {
    try {
      const response = await axios.post(
        "https://dzfaq4l3wb.execute-api.us-east-1.amazonaws.com/qa-deployment-stage/acquisitions",
        {
          tipo_exame: examType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { acquisitions } = response.data;

      if (examType === "ECG") {
        setECGReports(
          acquisitions.values.map((item: any[]) => ({
            relatorio_id: item[0],
            nome_paciente: item[1],
            medicos_relacionados: item[2],
            data_nascimento: item[3],
            data_exame: item[4],
            tipo_exame: item[5],
          }))
        );
      } else if (examType === "PICnI") {
        setPICNIReports(
          acquisitions.values.map((item: any[]) => ({
            relatorio_id: item[0],
            nome_paciente: item[1],
            medicos_relacionados: item[2],
            data_nascimento: item[3],
            data_exame: item[4],
            tipo_exame: item[5],
          }))
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch reports");
      console.error("Fetch reports failed:", error);
    }
  };

  const renderReportItem = ({ item }: { item: ReportItem }) => {
    const {
      relatorio_id,
      nome_paciente,
      data_exame,
      tipo_exame,
      data_nascimento,
      medicos_relacionados,
    } = item;

    return (
      <LinearGradient
        colors={[colors.secondary, "#00d7a4"]}
        style={styles.reportItemCarousel}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.reportItemCarousel}>
          <View style={styles.profileContainer}>
            <Ionicons
              name="person-circle-outline"
              size={90}
              color={colors.primary}
            />
          </View>

          <View style={styles.reportContentCarousel}>
            <Text style={styles.reportTextNameCarousel}>{nome_paciente}</Text>
            <View style={styles.reportInfoContainer}>
              <View style={styles.reportRow}>
                <Feather name="hash" size={14} color={colors.white} />
                <Text style={styles.reportTextInfo}>{relatorio_id}</Text>
              </View>
              <View style={styles.reportRow}>
                <Ionicons
                  name="medkit-outline"
                  size={14}
                  color={colors.white}
                />
                <Text style={styles.reportTextInfo}>
                  {medicos_relacionados.join(", ")}
                </Text>
              </View>
              <View style={styles.reportRow}>
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color={colors.white}
                />
                <Text style={styles.reportTextInfo}>{data_exame}</Text>
              </View>
              <View style={styles.reportRow}>
                <FontAwesome
                  name="birthday-cake"
                  size={14}
                  color={colors.white}
                />
                <Text style={styles.reportTextInfo}>{data_nascimento}</Text>
              </View>
              <View style={styles.reportRow}>
                <Ionicons name="heart-outline" size={14} color={colors.white} />
                <Text style={styles.reportTextInfo}>{tipo_exame}</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  };

  useEffect(() => {
    console.log("ECG Reports:", ecgReports);
    console.log("PICnI Reports:", picniReports);
    console.log("dados:", dados.nome);
  }, [ecgReports, picniReports]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}></View>

        <GradientText
          text={`Welcome ${dados.nome}`}
          colors={[colors.secondary, colors.green]}
          style={styles.sectionWelcome}
        />

        <View style={styles.content}>
          <View style={styles.carouselContainer}>
            <Carousel
              data={[...ecgReports, ...picniReports]}
              renderItem={renderReportItem}
              sliderWidth={300}
              itemWidth={250}
              containerCustomStyle={{ overflow: "visible" }}
              firstItem={1}
              loop={false}
              slideStyle={{ display: "flex", alignItems: "center" }}
              inactiveSlideOpacity={1}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
