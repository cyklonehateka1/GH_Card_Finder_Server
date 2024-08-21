export class CreateCardDto {
  firstName: string;
  lastName: string;
  idNumber: string;
  dateReported: string;
  dob: string;
  profileImg: string;
  type: string;
  repoter_name: string;
  repoter_phone: string;
  repoter_address: string;
  locationOfDocument: string;
}

export class SearchCardDto {
  idNumber?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
}
