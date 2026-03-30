//TechProfileScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuthStore } from "../../store/authStore";
import { profileApi } from "../../services/profileApi";
import { COLORS } from "../../theme/colors";
import { pick } from "@react-native-documents/picker"
import RNFS from "react-native-fs";

const { height } = Dimensions.get('window');


interface FieldProps {
  label: string
  value?: string
  keyboard?: "default" | "email-address" | "phone-pad"
  icon?: boolean
  onChange?: (v: string) => void
}

const Field: React.FC<FieldProps> = ({
  label,
  value,
  keyboard = "default",
  icon = false,
  onChange
}) => {

  return (
    <View style={styles.fieldWrapper}>

      <Text style={styles.floatingLabel}>{label}</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={value ?? ""}
          keyboardType={keyboard}
          onChangeText={onChange}
        />

        {icon && (
          <View style={styles.editIcon}>
            <Ionicons name="create-outline" size={16} color={COLORS.primary} />
          </View>
        )}

      </View>

    </View>
  )
}

export default function TechProfileScreen() {
  const { token, uid: userId } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>({});
  const [docNumber, setDocNumber] = useState("");
  const [mobileChanged, setMobileChanged] = useState(false);
  const [docType, setDocType] = useState<"" | "Aadhar" | "PAN" | "Driving License">("")
  const [showDocDropdown, setShowDocDropdown] = useState(false)
  const [selectedFile, setSelectedFile] = useState<{
    name: string
    type: string
    base64: string
  } | null>(null)

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      if (!token || !userId) return;

      const response = await profileApi.getUserDetails(token, Number(userId));

      const parsed =
        typeof response.resultData === "string"
          ? JSON.parse(response.resultData)
          : response.resultData;

      const p = parsed?.ResultData || {};

      setProfile(p);
      setDocNumber(p.AadharCardNo ?? "");

      setProfile(p);
      setDocNumber(p.AadharCardNo ?? "");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await pick({
        type: ["*/*"],
      });

      const file = result[0];

      const base64 = await RNFS.readFile(file.uri, "base64");

      setSelectedFile({
        name: file.name ?? "document",
        type: file.type ?? "application/octet-stream",
        base64,
      });

    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async () => {
    Alert.alert("Info", "Update API not available in backend yet");
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const manager =
    `${profile.OwnerFirstName ?? ""} ${profile.OwnerLastName ?? ""}`.trim();

  return (
    <View style={styles.root}>
      <View style={styles.redBg} />
      <ScrollView style={styles.whiteSheet} showsVerticalScrollIndicator={false}>
        {/* Profile Image */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri:
                profile.Photo ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.avatar}
          />

          <Pressable style={styles.avatarEdit}>
            <Ionicons name="create-outline" size={14} color="#fff" />
          </Pressable>
        </View>

        <Field
          label="First Name"
          value={profile.FirstName}
          onChange={(v) => setProfile({ ...profile, FirstName: v })}
        />

        <Field
          label="Last Name"
          value={profile.LastName}
          onChange={(v) => setProfile({ ...profile, LastName: v })}
        />

        <View style={styles.managerRow}>
          <Text style={styles.label}>Reporting Manager : </Text>
          <Text>{manager}</Text>
        </View>

        <Field
          label="Contact No"
          value={profile.ContactNo}
          keyboard="phone-pad"
          onChange={(v) => {
            setProfile({ ...profile, ContactNo: v });
            setMobileChanged(true);
          }}
        />

        <Field
          label="Address"
          value={profile.Address}
          onChange={(v) => setProfile({ ...profile, Address: v })}
        />

        <Field
          label="Email"
          value={profile.Email}
          keyboard="email-address"
          onChange={(v) => setProfile({ ...profile, Email: v })}
        />

        <Field
          label="Date of Birth"
          value={profile.DOB}
          onChange={(v) => setProfile({ ...profile, DOB: v })}
        />

        {docType === "Aadhar" && (
          <Field
            label="Aadhar Card"
            value={docNumber}
            keyboard="phone-pad"
            onChange={(v) => {
              if (v.length <= 12) setDocNumber(v)
            }}
          />
        )}

        {/* KYC */}
        <Text style={styles.section}>KYC Details</Text>

        <View style={styles.fieldWrapper}>
          <Text style={styles.floatingLabel}>Please Select Document</Text>

          <Pressable
            style={styles.inputBox}
            onPress={() => setShowDocDropdown(!showDocDropdown)}
          >

            <Text style={{fontSize:16}}>{docType}</Text>

            <Ionicons name="chevron-down" size={18} color="#333"/>

          </Pressable>

          {showDocDropdown && (
            <View style={styles.dropdownBox}>

              {["Aadhar","PAN","Driving License"].map((item)=>(
                <Pressable
                  key={item}
                  style={styles.dropdownItem}
                  onPress={()=>{
                    setDocType(item as any)
                    setShowDocDropdown(false)
                  }}
                >
                  <Text style={{fontSize:16}}>{item}</Text>
                </Pressable>
              ))}

            </View>
          )}

        </View>

        {/* Upload */}
          <Text style={styles.attachLabel}>Attach File</Text>

          <Pressable style={styles.attachBox} onPress={pickDocument}>

            {selectedFile ? (
              <Text style={styles.attachText}>{selectedFile.name}</Text>
            ) : (
              <Text style={styles.attachText}>
                Choose .pdf, .jpeg, .jpg, .png, .xlsx, .txt, .zip, etc. max file size is 6 MB
              </Text>
            )}

          </Pressable>

        {/* Update Button */}
        <Pressable style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateText}>UPDATE</Text>
        </Pressable>

        <Text style={styles.cancelText}>Cancel</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  redBg: {
    top: 0,
    height: height * 0.11,
    backgroundColor: COLORS.primary,
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 10,
  },

  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  avatarWrapper: { alignItems: "center", marginBottom: 25 },

  avatar: { width: 110, height: 110, borderRadius: 60 },

  avatarEdit: {
    position: "absolute",
    bottom: 4,
    right: "38%",
    backgroundColor: "#C22032",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  section: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    marginBottom: 5,
    fontWeight: "400",
    color: "rgba(182, 180, 182, 0.93)"
  },

  readonlyField: {
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    marginBottom: 14,
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
  },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#f6f6f6",
  },

  fieldWrapper:{
  marginBottom:18
},

floatingLabel:{
  position:'absolute',
  left:25,
  top:-8,
  backgroundColor:'#fff',
  paddingHorizontal:5,
  fontSize:13,
  color:'#8a8a8a',
  zIndex:10
},

inputBox:{
  height:48,
  borderRadius:28,
  borderWidth:1,
  borderColor:'#d1d1d1',
  paddingHorizontal:18,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  backgroundColor:'#f9f9f9'
},

input:{
  flex:1,
  fontSize:16,
  color:'#333'
},

editIcon:{
  borderWidth:1,
  borderColor:'#C22032',
  borderRadius:6,
  padding:4
},

attachLabel:{
  fontSize:16,
  fontWeight:'500',
  marginBottom:10
},

updateBtn:{
  backgroundColor:'#2f2f2f',
  height:52,
  borderRadius:30,
  justifyContent:'center',
  alignItems:'center',
  elevation:3
},

updateText:{
  color:'#fff',
  fontSize:18,
  fontWeight:'600'
},

cancelText:{
  textAlign:'center',
  color:'#C22032',
  marginTop:20,
  fontSize:18
},

managerRow:{
  flexDirection: 'row'
},

dropdownBox:{
  backgroundColor:"#fff",
  borderWidth:1,
  borderColor:"#ddd",
  borderRadius:8,
  marginTop:6,
  elevation:3
},

dropdownItem:{
  padding:12,
  borderBottomWidth:1,
  borderBottomColor:"#eee"
},

attachBox:{
  borderWidth:1,
  borderStyle:"dashed",
  borderColor:"#c9c9c9",
  borderRadius:6,
  padding:16,
  marginBottom:24
},

attachText:{
  color:"#666",
  fontSize:15
}
});