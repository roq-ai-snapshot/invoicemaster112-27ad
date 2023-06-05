import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { organisationMemberValidationSchema } from 'validationSchema/organisation-members';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.organisation_member
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getOrganisationMemberById();
    case 'PUT':
      return updateOrganisationMemberById();
    case 'DELETE':
      return deleteOrganisationMemberById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganisationMemberById() {
    const data = await prisma.organisation_member.findFirst(convertQueryToPrismaUtil(req.query, 'organisation_member'));
    return res.status(200).json(data);
  }

  async function updateOrganisationMemberById() {
    await organisationMemberValidationSchema.validate(req.body);
    const data = await prisma.organisation_member.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteOrganisationMemberById() {
    const data = await prisma.organisation_member.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
