import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pantallas } from "../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSolicitudes } from "../context/SolicitudContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import {
  COLOR_ESTADO,
  COLOR_PRIORIDAD,
  ESTADOS,
  ESTADOS_LABELS,
  PRIORIDADES,
  PRIORIDADES_LABELS,
} from "../utils/constants";
import { editarSolicitud } from "../usecases/EditarSolicitud";
import { puedeEliminarSolicitud } from "../usecases/EliminarSolicitud";
import { validarDescripcion } from "../utils/validators";
import { useEditSolicitudForm } from "../hooks/useEditSolicitudForm";

type EditScreenProps = NativeStackScreenProps<Pantallas, "Edit">;

export default function EditScreen({ route, navigation }: EditScreenProps) {
  const { solicitudId } = route.params;

  const { solicitudes} = useSolicitudes();

  const solicitud = solicitudes.find((s) => s.id === solicitudId);

  if (!solicitud) return <Text>No encontrada</Text>;

  const {form,handleGuardar,handleChange,handleEliminar} = useEditSolicitudForm(solicitud,() => (navigation.navigate("Home")))

  

  return (
    <ScrollView style={styles.contenedor}>
      {/* HEADER INFO — solo lectura */}
      <View style={styles.headerRow}>
        <View style={styles.idBox}>
          <Text style={styles.idTexto}>{solicitud?.id.slice(0, 13)}</Text>
        </View>
        <View style={styles.fechaRow}>
          <MaterialCommunityIcons
            name="calendar-outline"
            size={14}
            color="#888"
          />
          <Text style={styles.fechaTexto}>{solicitud?.fechaRegistro}</Text>
        </View>
      </View>

      {/* DATOS FIJOS — no editables */}
      <View style={styles.card}>
        <View style={styles.titulo}>
          <MaterialCommunityIcons
            name="account-outline"
            size={22}
            color="#356668"
          />
          <Text style={styles.cardTitle}>Información de Contacto</Text>
        </View>
        <View style={styles.filaInfo}>
          <View>
            <Text style={styles.minilabel}>MASCOTA</Text>
            <Text style={styles.valorTexto}>{solicitud?.mascotaNombre}</Text>
          </View>
          <View>
            <Text style={styles.minilabel}>CLIENTE</Text>
            <Text style={styles.valorTexto}>{solicitud?.clienteNombre}</Text>
          </View>
        </View>
        <Text style={styles.minilabel}>TELÉFONO</Text>
        <View style={styles.telefonoRow}>
          <MaterialCommunityIcons name="phone" size={16} color="#888" />
          <Text style={styles.valorTexto}>+51 {solicitud?.telefono}</Text>
        </View>
      </View>

      {/* ESTADO — editable */}
      <View style={styles.card}>
        <View style={styles.titulo}>
          <MaterialCommunityIcons
            name="list-status"
            size={22}
            color="#356668"
          />
          <Text style={styles.cardTitle}>Estado</Text>
        </View>
        <View style={styles.chipRow}>
          {ESTADOS.map((e) => (
            <TouchableOpacity
              key={e}
              onPress={()=>handleChange("estado",e)}
              style={[
                styles.chip,
                form.estado === e && {
                  backgroundColor: COLOR_ESTADO[e],
                  borderColor: COLOR_ESTADO[e],
                },
              ]}
            >
              <Text
                style={[
                  styles.chipTexto,
                  form.estado === e && { color: "#fff", fontWeight: "bold" },
                ]}
              >
                {ESTADOS_LABELS[e]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* PRIORIDAD — editable */}
      <View style={styles.card}>
        <View style={styles.titulo}>
          <MaterialCommunityIcons
            name="flag-outline"
            size={22}
            color="#356668"
          />
          <Text style={styles.cardTitle}>Prioridad</Text>
        </View>
        <View style={styles.chipRow}>
          {PRIORIDADES.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => handleChange("prioridad",p)}
              style={[
                styles.chip,
                form.prioridad === p && {
                  backgroundColor: COLOR_PRIORIDAD[p],
                  borderColor: COLOR_PRIORIDAD[p],
                },
              ]}
            >
              <View style={styles.chipInner}>
                <Text
                  style={[
                    styles.chipTexto,
                    form.prioridad === p && {
                      color: "#fff",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {PRIORIDADES_LABELS[p]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* DESCRIPCIÓN — editable */}
      <View style={styles.card}>
        <View style={styles.titulo}>
          <MaterialCommunityIcons
            name="text-box-outline"
            size={22}
            color="#356668"
          />
          <Text style={styles.cardTitle}>Descripción</Text>
        </View>
        <TextInput
          value={form.descripcion}
          onChangeText={(t) => handleChange("descripcion",t)}
          multiline
          style={styles.input}
          placeholder="Describe el motivo de la atención..."
          placeholderTextColor="#aaa"
          textColor="#000"
        />
      </View>

      {/* BOTONES */}
      <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar}>
        <Text style={styles.btnGuardarTexto}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnEliminar} onPress={handleEliminar}>
        <Text style={styles.btnEliminarTexto}>Eliminar solicitud</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#F7F9FE",
    padding: 20
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  idBox: {
    borderWidth: 1.5,
    borderColor: "#98ccd1",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#E8F3F4",
  },
  idTexto: { 
    fontSize: 20,
    fontWeight: "bold",
    color: "#356668" 
  },
  fechaRow: { 
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  fechaTexto: { 
    fontSize: 12,
    color: "#888"
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: "#E6E8E9",
    borderWidth: 2,
    padding: 15,
    marginBottom: 14,
  },
  titulo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#356668",
    letterSpacing: 0.5,
  },
  minilabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  valorTexto: {
    fontSize: 14,
    color: "#222", 
    fontWeight: "500"
  },
  filaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  telefonoRow: { 
    flexDirection: "row",
    alignItems: "center",
    gap: 6 },

  chipRow: { flexDirection: "row",
    gap: 8,
    flexWrap: "wrap"
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  chipInner: { 
    flexDirection: "row",
    alignItems: "center",
    gap: 6 },
  chipTexto: {
    fontSize: 12,
    color: "#555" },
  punto: {
    width: 7,
    height: 7,
    borderRadius: 10
  },

  input: {
    backgroundColor: "#ddeef0",
    padding: 14,
    borderRadius: 12,
    minHeight: 110,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#333",
  },

  btnGuardar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#356668",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  btnGuardarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
  btnEliminar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1.5,
    borderColor: "#f09595",
  },
  btnEliminarTexto: {
    color: "#a32d2d",
    fontWeight: "bold",
    fontSize: 15
  },
});
