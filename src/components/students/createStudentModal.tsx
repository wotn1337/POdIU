import { Checkbox, Flex, Form, Input, Select } from "antd";
import { getAcademicGroups, getCountries, getGenders } from "app/features";
import { setOpenCreateModal } from "app/features/students/studentsSlice";
import { useDispatch, useSelector } from "app/store";
import { CreateModal } from "components/shared/create-modal";
import { useEffect } from "react";

const requiredMessage = "Это поле обязательно для заполнения";

export const CreateStudentModal = () => {
  const dispatch = useDispatch();
  const {
    openCreateModal,
    countries,
    loadingCountries,
    genders,
    loadingGenders,
    academicGroups,
    loadingAcademicGroups,
  } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getGenders());
    dispatch(getAcademicGroups());
  }, []);

  return (
    <CreateModal
      openButtonProps={{
        children: "Добавить студента",
        onClick: () => dispatch(setOpenCreateModal(true)),
      }}
      modalProps={{
        open: openCreateModal,
        title: "Добавить студента",
        onCancel: () => dispatch(setOpenCreateModal(false)),
      }}
      formProps={{}}
      submitButtonProps={{}}
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
