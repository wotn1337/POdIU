import { Checkbox, Flex, Modal, Select, Space, Typography } from "antd";
import {
  useGetDormitoriesQuery,
  useGetGendersQuery,
  useUpdateStudentMutation,
} from "app/features";
import { Student } from "app/features/students/types";
import { RoomsTable } from "components/shared";
import { useState } from "react";
import s from "./students.module.scss";

type Props = {
  student: Student;
  onCancel: () => void;
};

export const SettlementModal: React.FC<Props> = ({ student, onCancel }) => {
  const {
    data: dormitoriesData,
    isLoading: dormitoriesLoading,
    isFetching: dormitoriesFetching,
  } = useGetDormitoriesQuery({
    page: 1,
    per_page: 100,
  });
  const {
    data: genders,
    isLoading: gendersLoading,
    isFetching: gendersFetching,
  } = useGetGendersQuery();
  const [dormId, setDormId] = useState<number>();
  const [gender, setGender] = useState<number>();
  const [isFamily, setIsFamily] = useState<boolean>(false);
  const [onlyAvailable, setAvailable] = useState<boolean>(true);
  const [updateStudent, { isLoading: updating }] = useUpdateStudentMutation();
  // const dispatch = useDispatch();
  // const { filters: dormFilters, sorters: dormSorters } = useSelector(
  //   (state) => state.dormitories
  // );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    student.dorm_room?.id ? [student.dorm_room.id] : []
  );

  const onSettlement = () => {
    updateStudent({
      ...student,
      gender_id: student.gender?.id,
      academic_group_id: student.academic_group?.id,
      country_id: student.country?.id,
      dorm_room_id: Number(selectedRowKeys[0]),
    });
  };

  return (
    <Modal
      open={true}
      title="Поселение"
      onCancel={onCancel}
      destroyOnClose
      className={s.settlementModal}
      getContainer={false}
      cancelText="Закрыть"
      okButtonProps={{ loading: updating }}
      okText="Поселить"
      onOk={onSettlement}
    >
      <Typography.Title level={5} className={s.cyrillicName}>
        {student.cyrillic_name}
      </Typography.Title>
      <Typography.Text className={s.latinName}>
        {student.latin_name}
      </Typography.Text>
      <Flex className={s.filters} gap="small" align="center">
        <Select
          loading={dormitoriesLoading || dormitoriesFetching}
          value={dormId}
          onChange={setDormId}
          placeholder="Выберите общежитие"
        >
          {dormitoriesData?.dormitories.map((dorm) => (
            <Select.Option key={dorm.id}>
              {dorm.number} / {dorm.address}
            </Select.Option>
          ))}
        </Select>
        <Select
          loading={gendersLoading || gendersFetching}
          value={gender}
          onChange={setGender}
          placeholder="Выберите пол"
        >
          {genders?.map((gender) => (
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
          actions={false}
          selection={{
            type: "radio",
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          onlyAvailable={onlyAvailable}
          isFamily={isFamily}
          gender={gender}
        />
      )}
    </Modal>
  );
};
