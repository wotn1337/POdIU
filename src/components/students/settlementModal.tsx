import { Checkbox, Flex, Modal, Select, Space, Typography } from "antd";
import { setSettlementModal } from "app/features/students/studentsSlice";
import { useDispatch, useSelector } from "app/store";
import s from "./students.module.scss";
import { useEffect, useState } from "react";
import { getDormRooms, getDormitories, updateStudent } from "app/features";
import { RoomsTable } from "components/dormitories";

export const SettlementModal = () => {
  const [dormId, setDormId] = useState<number>();
  const [gender, setGender] = useState<number>();
  const [isFamily, setIsFamily] = useState<boolean>(false);
  const [onlyAvailable, setAvailable] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dispatch = useDispatch();
  const { settlementModal, updating, loadingGenders, genders } = useSelector(
    (state) => state.students
  );
  const { filters: dormFilters, sorters: dormSorters } = useSelector(
    (state) => state.dormitories
  );
  const {
    dormitories,
    loading: loadingDormitories,
    gettingRoomsDormIds,
    dormRooms,
  } = useSelector((state) => state.dormitories);
  const { open, student } = settlementModal;

  const onSettlement = () => {
    if (student) {
      dispatch(
        updateStudent({
          ...student,
          gender_id: student.gender?.id,
          academic_group_id: student.academic_group?.id,
          country_id: student.country?.id,
          dorm_room_id: Number(selectedRowKeys[0]),
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getDormitories({
        page: 1,
        per_page: 100,
        filters: dormFilters,
        sorters: dormSorters,
      })
    );
  }, []);

  useEffect(() => {
    if (dormId) {
      dispatch(
        getDormRooms({
          dormId,
          page: 1,
          per_page: 10,
          gender_id: gender,
          is_family: isFamily,
          only_available_dorm_rooms: onlyAvailable,
          with_students: true,
        })
      );
    }
  }, [dormId, gender, isFamily, onlyAvailable]);

  return (
    <Modal
      open={open}
      title="Поселение"
      onCancel={() => dispatch(setSettlementModal(false))}
      destroyOnClose
      className={s.settlementModal}
      getContainer={false}
      cancelText="Закрыть"
      okButtonProps={{ loading: updating, disabled: !selectedRowKeys.length }}
      okText="Поселить"
      onOk={onSettlement}
    >
      <Typography.Title level={5} className={s.cyrillicName}>
        {student?.cyrillic_name}
      </Typography.Title>
      <Typography.Text className={s.latinName}>
        {student?.latin_name}
      </Typography.Text>
      <Flex className={s.filters} gap="small" align="center">
        <Select
          loading={loadingDormitories}
          value={dormId}
          onChange={setDormId}
          placeholder="Выберите общежитие"
        >
          {dormitories.map((dorm) => (
            <Select.Option key={dorm.id}>
              {dorm.number} / {dorm.address}
            </Select.Option>
          ))}
        </Select>
        <Select
          loading={loadingGenders}
          value={gender}
          onChange={setGender}
          placeholder="Выберите пол"
        >
          {genders.map((gender) => (
            <Select.Option key={gender.id}>{gender.title}</Select.Option>
          ))}
        </Select>
        <Space size="small">
          <Checkbox
            checked={isFamily}
            onChange={(e) => setIsFamily(e.target.checked)}
          >
            Семья
          </Checkbox>
          <Checkbox
            checked={onlyAvailable}
            onChange={(e) => setAvailable(e.target.checked)}
          >
            Только свободные
          </Checkbox>
        </Space>
      </Flex>
      {dormId && (
        <RoomsTable
          dormId={dormId}
          loading={gettingRoomsDormIds.includes(dormId)}
          roomsInfo={dormRooms[dormId]}
          withActions={false}
          selection={{
            type: "radio",
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
        />
      )}
    </Modal>
  );
};
