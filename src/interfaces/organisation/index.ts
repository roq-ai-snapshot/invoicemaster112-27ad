import { ContractInterface } from 'interfaces/contract';
import { InvoiceInterface } from 'interfaces/invoice';
import { OrganisationMemberInterface } from 'interfaces/organisation-member';
import { UserInterface } from 'interfaces/user';

export interface OrganisationInterface {
  id?: string;
  name: string;
  user_id: string;
  contract?: ContractInterface[];
  invoice?: InvoiceInterface[];
  organisation_member?: OrganisationMemberInterface[];
  user?: UserInterface;
  _count?: {
    contract?: number;
    invoice?: number;
    organisation_member?: number;
  };
}
