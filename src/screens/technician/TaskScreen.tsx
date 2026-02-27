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
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';
import { useAuthStore } from '../../store/authStore';
import {
  getTasksApi,
  getTaskTagsApi,
} from '../../services/taskApi';
import { Task, TaskTag } from '../../types/task.types';

const { height } = Dimensions.get('window');

const STATUS_OPTIONS = [
  { Id: 1, Name: 'Completed' },
  { Id: 2, Name: 'Rejected' },
  { Id: 3, Name: 'Ongoing' },
  { Id: 4, Name: 'InActive' },
  { Id: 5, Name: 'OnHold' },
];

export default function TaskScreen() {
  const { uid, token } = useAuthStore();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tagList, setTagList] = useState<TaskTag[]>([]);
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

  const formatMonthYear = (date: Date) =>
    date.toLocaleString('en-IN', {
      month: 'short',
      year: 'numeric',
    });

  // -------- FETCH TAGS --------
  const fetchTags = async () => {
    if (!token || !uid) return;
    const tags = await getTaskTagsApi(token, Number(uid));
    setTagList(tags);
  };

  // -------- FETCH TASKS --------
  const fetchTasks = async (page = 1, reset = false) => {
    if (!token || !uid) return;

    if (reset) setTasks([]);

    setLoading(true);

    try {
      const response = await getTasksApi(
        token,
        Number(uid),
        search,
        selectedStatus?.Id || 0,
        selectedTag?.TaskTagId || 0,
        page,
        10
      );

      const newTasks = response?.ResultData || [];
      console.log("Res--------",response)
      setRecordCount(response?.RecordCount || 0);

      const monthFiltered = newTasks.filter(task => {
        const d = new Date(task.TaskDate);
        return (
          d.getMonth() === selectedDate.getMonth() &&
          d.getFullYear() === selectedDate.getFullYear()
        );
      });

      setTasks(prev =>
        page === 1
          ? monthFiltered
          : [...prev, ...monthFiltered]
      );
    } catch (err) {
      console.log('Task Fetch Error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchTasks(1, true);
  }, [selectedTag, selectedStatus, search, selectedDate]);

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

  // -------- CARD --------
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <View
        style={[
          styles.leftRibbon,
          item.TaskStatus === 'Ongoing'
            ? styles.ribbonOngoing
            : styles.ribbonInactive,
        ]}
      >
        <Text style={styles.ribbonText}>
          {item.TaskStatus?.toUpperCase()}
        </Text>
      </View>

      {item.TaskTagName && (
        <View style={styles.rightRibbon}>
          <Text style={styles.ribbonText}>
            {item.TaskTagName.toUpperCase()}
          </Text>
        </View>
      )}

      <Text style={styles.dateText}>
        {new Date(item.TaskDate).toLocaleString()}
      </Text>

      <Text style={styles.title}>
        {item.TaskName}{' '}
        <Text style={styles.taskId}>
          [{item.TaskId}]
        </Text>
      </Text>

      <Text style={styles.address}>
        {item.CustomerName}
      </Text>

      {item.FieldworkerName && (
        <Text style={styles.customer}>
          {item.FieldworkerName}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.root}>
      <View style={styles.redBg} />

      {/* MONTH SELECTOR */}
      <View style={styles.monthRow}>
        <Pressable
          style={styles.monthWrapper}
          onPress={() => setShowMonthPicker(true)}
        >
          <Text style={styles.monthText}>
            {formatMonthYear(selectedDate)}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.whiteSheet}>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          {!search && (
            <Ionicons name="search" size={20} color="#9CA3AF" />
          )}
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

        {/* FILTERS */}
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

          <Pressable
            style={styles.refreshItem}
            onPress={handleRefresh}
          >
            <Text style={styles.refreshText}>
              Refresh List
            </Text>
            <Ionicons name="refresh" size={16} color={COLORS.primary} />
          </Pressable>
        </View>

        {/* LIST */}
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        )}
      </View>

      {/* TAG MODAL */}
      <Modal
        visible={activeDropdown === 'TAG'}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setActiveDropdown(null)}
        />

        <View style={styles.centerModal}>
          <Text style={styles.modalTitle}>
            Select Task Tag
          </Text>

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
              tag.TaskTagName
                .toLowerCase()
                .includes(tagSearch.toLowerCase())
            )}
            keyExtractor={(item) =>
              item.TaskTagId.toString()
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

      {/* STATUS MODAL */}
      <Modal
        visible={activeDropdown === 'STATUS'}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setActiveDropdown(null)}
        />

        <View style={styles.centerModal}>
          <Text style={styles.modalTitle}>
            Select Status
          </Text>

          <FlatList
            data={STATUS_OPTIONS}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={styles.modalItem}
                onPress={() => {
                  setSelectedStatus(item);
                  setActiveDropdown(null);
                }}
              >
                <Text>{item.Name}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>

      {/* MONTH MODAL */}
      <Modal
        visible={showMonthPicker}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowMonthPicker(false)}
        />

        <View style={styles.centerModal}>
          <Text style={styles.modalTitle}>
            Select Month
          </Text>

          <FlatList
            data={[...Array(12)].map((_, i) =>
              new Date(selectedDate.getFullYear(), i, 1)
            )}
            keyExtractor={(item) => item.toISOString()}
            renderItem={({ item }) => (
              <Pressable
                style={styles.modalItem}
                onPress={() => {
                  setSelectedDate(item);
                  setShowMonthPicker(false);
                }}
              >
                <Text>{formatMonthYear(item)}</Text>
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

  redBg: {
    height: height * 0.1,
    backgroundColor: COLORS.primary,
  },

  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 16,
  },

  dropdown: {
    position: 'absolute',
    top: 220,
    left: 40,
    width: 250,
    backgroundColor: '#fff',
    elevation: 6,
    borderRadius: 10,
  },

  dropdownItem: {
    padding: 12,
  },

  statusTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 14,
  },

  ongoing: { backgroundColor: '#F59E0B' },
  completed: { backgroundColor: '#16A34A' },
  inactive: { backgroundColor: '#9CA3AF' },

  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  tagText: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
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

ribbonOngoing: {
  backgroundColor: '#F59E0B',
},

ribbonInactive: {
  backgroundColor: '#9CA3AF',
},

ribbonText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '600',
},

rightRibbonText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '600',
},

dateText: {
  position: 'absolute',
  right: 18,
  top: 48,
  fontSize: 12,
  color: '#6B7280',
},

title: {
  fontSize: 20,
  fontWeight: '700',
  marginTop: 22,
},

taskId: {
  color: '#2563EB',
  fontWeight: '600',
},

address: {
  marginTop: 8,
  fontSize: 15,
  color: '#6B7280',
},

customer: {
  marginTop: 6,
  fontSize: 15,
  color: '#374151',
},

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
  alignItems: 'center',
  marginBottom: 18,
},

filterItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
},

filterText: {
  fontSize: 15,
  color: '#111827',
},

refreshItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
},

refreshText: {
  fontSize: 15,
  color: COLORS.primary,
  fontWeight: '600',
},

monthRow: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingHorizontal: 20,
  paddingVertical: 6,
},

monthWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},

monthText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '500',
},

monthDropdown: {
  position: 'absolute',
  top: 110,
  right: 20,
  width: 160,
  backgroundColor: '#fff',
  borderRadius: 12,
  elevation: 6,
  paddingVertical: 6,
  zIndex: 100,
},

overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
},

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

modalTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 12,
},

modalSearchBox: {
  borderWidth: 1,
  borderColor: COLORS.primary,
  borderRadius: 8,
  paddingHorizontal: 10,
  marginBottom: 12,
},

modalSearchInput: {
  height: 40,
},

modalItem: {
  paddingVertical: 12,
},
});