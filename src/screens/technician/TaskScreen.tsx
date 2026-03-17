import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';
import { useAuthStore } from '../../store/authStore';
import { getTasksApi, getTaskTagsApi, getTaskStatusApi } from '../../services/taskApi';
import { Task, TaskTag } from '../../types/task.types';

const { height } = Dimensions.get('window');

const createdDate = new Date('2024-06-01');

const getMonthYearRange = (start: Date, end: Date) => {
  const list: { month: number; year: number; label: string }[] = [];
  let current = new Date(start);

  while (current <= end) {
    list.push({
      month: current.getMonth(),
      year: current.getFullYear(),
      label: current.toLocaleString('en-IN', { month: 'short', year: 'numeric' }),
    });

    current.setMonth(current.getMonth() + 1);
  }

  return list;
};

const getStatusStyle = (statusId: number) => {
  switch (statusId) {
    case 3:
      return styles.ribbonOngoing;
    case 1:
      return styles.ribbonCompleted;
    case 4:
      return styles.ribbonInactive;
    case 5:
      return styles.ribbonOnHold;
    case 2:
      return styles.ribbonRejected;
    default:
      return styles.ribbonInactive;
  }
};

export default function TaskScreen({ navigation }: any) {
  const { uid, token } = useAuthStore();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tagList, setTagList] = useState<TaskTag[]>([]);
  const [statusList, setStatusList] = useState<any[]>([]);

  const [selectedTag, setSelectedTag] = useState<TaskTag | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const [search, setSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');

  const [pageIndex, setPageIndex] = useState(1);
  const [recordCount, setRecordCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [activeDropdown, setActiveDropdown] =
    useState<'TAG' | 'STATUS' | null>(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const monthYearOptions = getMonthYearRange(createdDate, new Date());

  const formatMonthYear = (date: Date) =>
    date.toLocaleString('en-IN', { month: 'short', year: 'numeric' });

  const fetchTags = async () => {
    if (!token || !uid) return;
    const tags = await getTaskTagsApi(token, Number(uid));
    setTagList(tags);
  };

  const fetchStatuses = async () => {
    if (!token) return;
    const data = await getTaskStatusApi(token);
    setStatusList(data || []);
  };

  const fetchTasks = async (page = 1, reset = false) => {
    if (!token || !uid) return;

    if (reset) setTasks([]);

    try {
      setLoading(true);

      const response = await getTasksApi(
        token,
        Number(uid),
        search,
        selectedStatus?.Id || 0,
        page,
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear(),
        selectedTag?.TaskTagId || 0
      );

      const newTasks = response?.ResultData || [];
      setRecordCount(response?.RecordCount || 0);

      setTasks(prev =>
        page === 1 ? newTasks : [...prev, ...newTasks]
      );
    } catch (err) {
      console.log('Task fetch error', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchStatuses();
  }, []);

  useEffect(() => {
    setPageIndex(1);
    fetchTasks(1, true);
  }, [selectedStatus, selectedTag, search, selectedDate]);

  useEffect(() => {
    console.log("STATUS LIST", statusList)
    console.log("TAG LIST", tagList)
  }, [statusList, tagList]);

  const handleRefresh = () => {
    setRefreshing(true);
    setSelectedTag(null);
    setSelectedStatus(null);
    setSearch('');
    setSelectedDate(new Date());
    setPageIndex(1);
    fetchTasks(1, true);
  };

  const loadMore = () => {
    if (tasks.length >= recordCount) return;

    const nextPage = pageIndex + 1;
    setPageIndex(nextPage);
    fetchTasks(nextPage);
  };

  const openTask = (task: Task) => {
    switch (task.TaskState) {
      case 0:
      case 1:
        navigation.navigate('TaskTracking', { task });
        break;

      case 2:
        navigation.navigate('PaymentReceived', { task });
        break;

      case 3:
        navigation.navigate('TaskClosure', { task });
        break;

      case 4:
        Alert.alert('Task already completed');
        break;
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <Pressable style={styles.card} onPress={() => openTask(item)}>
      <View style={[styles.leftRibbon, getStatusStyle(item?.TaskStatusId ?? 4)]}>
        <Text style={styles.ribbonText}>{item?.TaskStatus ? item.TaskStatus.toUpperCase() : ''}</Text>
      </View>

      {item.Task_TagName && (
        <View style={styles.rightRibbon}>
          <Text style={styles.ribbonText}>{item.Task_TagName.toUpperCase()}</Text>
        </View>
      )}

      <Text style={styles.dateText}>
        {item?.TaskDate
          ? new Date(item.TaskDate).toLocaleString()
          : ''}
      </Text>

      <Text style={styles.address}>{item.FullAddress || item.CustomerName}</Text>
      <Text style={styles.address}>{item.CustomerName}</Text>

      {item.FirstNameLastName && (
        <Text style={styles.customer}>{item.FirstNameLastName}</Text>
      )}
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <View style={styles.redBg} />

      <View style={styles.monthRow}>
        <Pressable
          style={styles.monthWrapper}
          onPress={() => setShowMonthPicker(true)}
        >
          <Text style={styles.monthText}>{formatMonthYear(selectedDate)}</Text>
          <Ionicons name="chevron-down" size={18} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.whiteSheet}>

        <View style={styles.searchContainer}>
          {!search && <Ionicons name="search" size={20} color="#9CA3AF" />}
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Customer Or Task Id Number"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            cursorColor={COLORS.primary}
          />
          {search !== '' && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </Pressable>
          )}
        </View>

        <View style={styles.filterRow}>

          <Pressable
            style={styles.filterItem}
            onPress={() => setActiveDropdown('TAG')}
          >
            <Text style={styles.filterText}>
              {selectedTag?.TaskTagName || 'Select Task Tag'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.primary} />
          </Pressable>

          <Pressable
            style={styles.filterItem}
            onPress={() => setActiveDropdown('STATUS')}
          >
            <Text style={styles.filterText}>
              {selectedStatus?.Name || 'Status'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.primary} />
          </Pressable>

          <Pressable style={styles.refreshItem} onPress={handleRefresh}>
            <Text style={styles.refreshText}>Refresh List</Text>
            <Ionicons name="refresh" size={16} color={COLORS.primary} />
          </Pressable>

        </View>

        {loading && pageIndex === 1 ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item, index) =>
              item?.Id ? String(item.Id) : index.toString()
            }
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
      </View>

      <Modal visible={activeDropdown === 'TAG'} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setActiveDropdown(null)} />

        <View style={styles.centerModal}>
          <Text style={styles.modalTitle}>Select Task Tag</Text>

          <View style={styles.modalSearchBox}>
            <TextInput
              value={tagSearch}
              onChangeText={setTagSearch}
              placeholder="Search Tag"
              placeholderTextColor="#9CA3AF"
              style={styles.modalSearchInput}
              cursorColor={COLORS.primary}
            />
          </View>

          <FlatList
            data={tagList.filter(tag =>
              tag.TaskTagName.toLowerCase().includes(tagSearch.toLowerCase())
            )}
            keyExtractor={(item, index) =>
              item?.TaskTagId
                ? item.TaskTagId.toString()
                : index.toString()
            }
            renderItem={({ item }) => (
              <Pressable
                style={styles.modalItem}
                onPress={() => {
                  setSelectedTag(item);
                  setTagSearch('');
                  setActiveDropdown(null);
                }}
              >
                <Text>{item.TaskTagName}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>

      <Modal visible={activeDropdown === 'STATUS'} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setActiveDropdown(null)} />

        <View style={styles.centerModal}>
          <Text style={styles.modalTitle}>Select Status</Text>

          <FlatList
            data={statusList}
            keyExtractor={(item, index) =>
              item?.Id ? item.Id.toString() : index.toString()
            }
            renderItem={({ item }) => (
              <Pressable
                style={styles.modalItem}
                onPress={() => {
                  setSelectedStatus({
                    Id: item.Id,
                    Name: item.Name,
                  });
                  setActiveDropdown(null);
                }}
              >
                <Text>{item.Name}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>

      <Modal visible={showMonthPicker} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setShowMonthPicker(false)} />

        <View style={styles.centerModal}>
          <Text style={styles.modalTitle}>Select Month</Text>

          <FlatList
            data={monthYearOptions}
            keyExtractor={(item) => item.month + '-' + item.year}
            renderItem={({ item }) => (
              <Pressable
                style={styles.modalItem}
                onPress={() => {
                  setSelectedDate(new Date(item.year, item.month, 1));
                  setShowMonthPicker(false);
                }}
              >
                <Text>{item.label}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.primary },
  redBg: { height: height * 0.1, backgroundColor: COLORS.primary },

  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
  },

  leftRibbon: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  rightRibbon: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    backgroundColor: '#2563EB',
  },

  ribbonOngoing: { backgroundColor: '#F59E0B' },
  ribbonCompleted: { backgroundColor: '#16A34A' },
  ribbonInactive: { backgroundColor: '#9CA3AF' },
  ribbonOnHold: { backgroundColor: '#6366F1' },
  ribbonRejected: { backgroundColor: '#DC2626' },

  ribbonText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  dateText: {
    position: 'absolute',
    right: 18,
    top: 48,
    fontSize: 12,
    color: '#6B7280',
  },

  address: { marginTop: 8, fontSize: 15, color: '#6B7280' },
  customer: { marginTop: 6, fontSize: 15, color: '#374151' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    height: 45,
    borderBottomWidth: 1,
    borderColor: '#222222',
    marginBottom: 15,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 18,
    color: '#222222',
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  filterItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },

  filterText: { fontSize: 15, color: '#111827' },

  refreshItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },

  refreshText: { fontSize: 15, color: COLORS.primary, fontWeight: '600' },

  monthRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },

  monthWrapper: { flexDirection: 'row', alignItems: 'center', gap: 6 },

  monthText: { color: '#fff', fontSize: 18, fontWeight: '500' },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },

  centerModal: {
    position: 'absolute',
    top: '25%',
    left: '8%',
    right: '8%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    maxHeight: 450,
  },

  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },

  modalSearchBox: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },

  modalSearchInput: { height: 40 },

  modalItem: { paddingVertical: 12 },
});