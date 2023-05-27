import React, { useEffect, useState } from "react";
import { View, Text, Alert, TextInput, Switch, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "./ReportListStyles";
import { colors } from "../../constants/theme";

interface ReportItem {
  relatorio_id: string;
  nome_paciente: string;
  medicos_relacionados: string[];
  data_nascimento: string;
  data_exame: string;
  tipo_exame: string;
}

interface RouteParams {
  token: string;
}

const ReportListScreen: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [filteredReports, setFilteredReports] = useState<ReportItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayAsList, setDisplayAsList] = useState(true);
  const route = useRoute();
  const { token } = route.params as RouteParams;

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

      const reportItems = acquisitions.values.map((item: any[]) => ({
        relatorio_id: item[0],
        nome_paciente: item[1],
        medicos_relacionados: item[2],
        data_nascimento: item[3],
        data_exame: item[4],
        tipo_exame: item[5],
      }));

      setReports((prevReports) => [...prevReports, ...reportItems]);
      setFilteredReports((prevReports) => [...prevReports, ...reportItems]);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch reports");
      console.error("Fetch reports failed:", error);
    }
  };

  const filterReports = (query: string) => {
    let filtered: ReportItem[] = [];
    if (query !== "") {
      filtered = reports.filter((report) => {
        const {
          relatorio_id,
          nome_paciente,
          data_exame,
          tipo_exame,
          data_nascimento,
          medicos_relacionados,
        } = report;
        return (
          relatorio_id.toLowerCase().includes(query.toLowerCase()) ||
          nome_paciente.toLowerCase().includes(query.toLowerCase()) ||
          data_exame.toLowerCase().includes(query.toLowerCase()) ||
          tipo_exame.toLowerCase().includes(query.toLowerCase()) ||
          data_nascimento.toLowerCase().includes(query.toLowerCase()) ||
          medicos_relacionados.some((medico) =>
            medico.toLowerCase().includes(query.toLowerCase())
          )
        );
      });
    } else {
      filtered = reports;
    }
    setFilteredReports(filtered);
  };

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
    filterReports(text);
  };

  const toggleDisplay = () => {
    setDisplayAsList((prevDisplayAsList) => !prevDisplayAsList);
  };

  const renderListItem = ({ item }: { item: ReportItem }) => {
    const {
      relatorio_id,
      nome_paciente,
      medicos_relacionados,
      data_nascimento,
      data_exame,
      tipo_exame,
    } = item;

    return (
      <View style={styles.listItem}>
        <Feather
          name="file-text"
          size={24}
          color={colors.primary}
          style={styles.icon}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemLabel}>Relatório ID:</Text>
          <Text style={styles.itemText}>{relatorio_id}</Text>

          <Text style={styles.itemLabel}>Nome Paciente:</Text>
          <Text style={styles.itemText}>{nome_paciente}</Text>

          <Text style={styles.itemLabel}>Médicos Relacionados:</Text>
          <Text style={styles.itemText}>{medicos_relacionados.join(", ")}</Text>

          <Text style={styles.itemLabel}>Data de Nascimento:</Text>
          <Text style={styles.itemText}>{data_nascimento}</Text>

          <Text style={styles.itemLabel}>Data do Exame:</Text>
          <Text style={styles.itemText}>{data_exame}</Text>

          <Text style={styles.itemLabel}>Tipo de Exame:</Text>
          <Text style={styles.itemText}>{tipo_exame}</Text>
        </View>
      </View>
    );
  };

  const renderBoxItem = ({ item }: { item: ReportItem }) => {
    const {
      relatorio_id,
      nome_paciente,
      data_nascimento,
      medicos_relacionados,
    } = item;

    return (
      <View style={styles.boxItem}>
        <View style={styles.iconContainer}>
          <Feather name="file-text" size={24} color={colors.white} />
        </View>
        <View style={styles.reportBoxContent}>
          <View style={styles.row}>
            <Text style={styles.label}>Relatório ID:</Text>
            <Text style={styles.text}>{relatorio_id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nome Paciente:</Text>
            <Text style={styles.text}>{nome_paciente}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Médicos Relacionados:</Text>
            <Text style={styles.text}>{medicos_relacionados.join(", ")}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.text}>{data_nascimento}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearchQueryChange}
          />
        </View>
        <Switch value={displayAsList} onValueChange={toggleDisplay} />
      </View>
      <View style={styles.content}>
        {displayAsList ? (
          <FlatList
            data={filteredReports}
            renderItem={renderListItem}
            keyExtractor={(item) => item.relatorio_id}
            contentContainerStyle={styles.list}
          />
        ) : (
          <FlatList
            data={filteredReports}
            renderItem={renderBoxItem}
            keyExtractor={(item) => item.relatorio_id}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </View>
  );
};

export default ReportListScreen;
