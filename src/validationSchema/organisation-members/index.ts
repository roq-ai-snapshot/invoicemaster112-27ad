import * as yup from 'yup';

export const organisationMemberValidationSchema = yup.object().shape({
  organisation_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
