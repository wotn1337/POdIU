import { Checkbox, Flex, Form, Input, Select } from "antd";
import {
  createStudent,
  getAcademicGroups,
  getCountries,
  getGenders,
  updateStudent,
} from "app/features";
import { setCreateModal } from "app/features/students/studentsSlice";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";
import { useEffect } from "react";

export const CreateStudentModal = () => {
  const dispatch = useDispatch();
  const {
    createModal,
    countries,
    loadingCountries,
    genders,
    loadingGenders,
    academicGroups,
    loadingAcademicGroups,
    creating,
    updating,
  } = useSelector((state) => state.students);
  const { open, defaultStudent } = createModal;

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getGenders());
    dispatch(getAcademicGroups());
  }, []);

  return (
    <CreateModal
      openButtonProps={{
        children: `${defaultStudent ? "Изменить" : "Добавить"} студента`,
        onClick: () => dispatch(setCreateModal({ open: true })),
      }}
      modalProps={{
        open: open,
        title: `${defaultStudent ? "Изменить" : "Добавить"} студента`,
        onCancel: () => dispatch(setCreateModal({ open: false })),
      }}
      formProps={{
        name: "create-student",
        disabled: creating || updating,
        onFinish: (values) =>
          dispatch(
            defaultStudent
              ? updateStudent({ id: defaultStudent.id, ...values })
              : createStudent(values)
          ),
        initialValues: defaultStudent
          ? {
              ...defaultStudent,
              country_id: String(defaultStudent?.country?.id),
              gender_id: String(defaultStudent?.gender?.id),
              academic_group_id: String(defaultStudent?.academic_group?.id),
            }
          : {
              is_family: false,
            },
      }}
      submitButtonProps={{
        loading: creating || updating,
        children: defaultStudent ? "Изменить" : "Добавить",
      }}
    >
      <Form.Item
        label="ФИО (Латиница)"
        name="latin_name"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ФИО (Кириллица)"
        name="cyrillic_name"
        rules={[{ required: true, message: requiredMessage }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Номер телефона" name="telephone">
        <Input />
      </Form.Item>
      <Form.Item label="ЕИСУ" name="eisu_id">
        <Input />
      </Form.Item>
      <Form.Item label="Страна" name="country_id">
        <Select loading={loadingCountries}>
          {countries.map((country) => (
            <Select.Option key={country.id}>{country.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Flex justify="space-between" gap={10}>
        <Form.Item label="Пол" name="gender_id" style={{ flex: 1 }}>
          <Select loading={loadingGenders}>
            {genders.map((gender) => (
              <Select.Option key={gender.id}>{gender.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="is_family" valuePropName="checked">
          <Checkbox>Семья</Checkbox>
        </Form.Item>
      </Flex>
      <Form.Item label="Группа" name="academic_group_id">
        <Select loading={loadingAcademicGroups}>
          {academicGroups.map((group) => (
            <Select.Option key={group.id}>{group.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Комментарий" name="comment">
        <Input.TextArea />
      </Form.Item>
    </CreateModal>
  );
};
