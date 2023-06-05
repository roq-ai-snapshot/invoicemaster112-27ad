import axios from 'axios';
import queryString from 'query-string';
import { OrganisationMemberInterface } from 'interfaces/organisation-member';
import { GetQueryInterface } from '../../interfaces';

export const getOrganisationMembers = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/organisation-members${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOrganisationMember = async (organisationMember: OrganisationMemberInterface) => {
  const response = await axios.post('/api/organisation-members', organisationMember);
  return response.data;
};

export const updateOrganisationMemberById = async (id: string, organisationMember: OrganisationMemberInterface) => {
  const response = await axios.put(`/api/organisation-members/${id}`, organisationMember);
  return response.data;
};

export const getOrganisationMemberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/organisation-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOrganisationMemberById = async (id: string) => {
  const response = await axios.delete(`/api/organisation-members/${id}`);
  return response.data;
};
