import { Checkbox, Flex, Form, Input, Select } from "antd";
import {
  setCreateStudentModal,
  useCreateStudentMutation,
  useGetAcademicGroupsQuery,
  useGetCountriesQuery,
  useGetGendersQuery,
  useUpdateStudentMutation,
} from "app/features";
import { PostStudentData } from "app/features/students/types";
import { useDispatch, useSelector } from "app/store";
import { requiredMessage } from "assets/constants";
import { CreateModal } from "components/shared/create-modal";

export const CreateStudentModal = () => {
  const dispatch = useDispatch();
  const {
    createStudentModal: { open, defaultStudent },
  } = useSelector((state) => state.students);
  const { data: genders, isLoading: gendersLoading } = useGetGendersQuery();
  const { data: countries, isLoading: countriesLoading } =
    useGetCountriesQuery();
  const { data: academicGroups, isLoading: academicGroupsLoading } =
    useGetAcademicGroupsQuery();
  const [createStudent, { isLoading: creating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: updating }] = useUpdateStudentMutation();
  const loading = creating || updating;

  const onFinish = (values: PostStudentData) => {
    if (defaultStudent) {
      updateStudent({ id: defaultStudent.id, ...values });
    } else {
      createStudent(values);
    }
  };

  return (
    <CreateModal<PostStudentData>
      modalProps={{
        open: open,
        title: `${defaultStudent ? "Изменить" : "Добавить"} студента`,
        onCancel: () => dispatch(setCreateStudentModal({ open: false })),
      }}
      formProps={{
        name: "create-student",
        disabled: loading,
        onFinish,
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
        loading,
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
        <Select loading={countriesLoading}>
          {countries?.map((country) => (
            <Select.Option key={country.id}>{country.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Flex justify="space-between" gap={10}>
        <Form.Item label="Пол" name="gender_id" style={{ flex: 1 }}>
          <Select loading={gendersLoading}>
            {genders?.map((gender) => (
              <Select.Option key={gender.id}>{gender.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="is_family" valuePropName="checked">
          <Checkbox>Семья</Checkbox>
        </Form.Item>
      </Flex>
      <Form.Item label="Группа" name="academic_group_id">
        <Select loading={academicGroupsLoading}>
          {academicGroups?.map((group) => (
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
