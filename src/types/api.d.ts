/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleDriving
// ====================================================

export interface ToggleDriving_ToggleDrivingMode {
  __typename: "ToggleDrivingModeResponse";
  ok: boolean;
  error: string | null;
}

export interface ToggleDriving {
  ToggleDrivingMode: ToggleDriving_ToggleDrivingMode;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditPlace
// ====================================================

export interface EditPlace_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface EditPlace {
  EditPlace: EditPlace_EditPlace;
}

export interface EditPlaceVariables {
  placeId: number;
  isFav?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPlace
// ====================================================

export interface AddPlace_AddPlace {
  __typename: "AddPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface AddPlace {
  AddPlace: AddPlace_AddPlace;
}

export interface AddPlaceVariables {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetChat
// ====================================================

export interface GetChat_GetChat_chat_messages {
  __typename: "Message";
  id: number;
  text: string;
  userId: number | null;
}

export interface GetChat_GetChat_chat {
  __typename: "Chat";
  passengerId: number;
  driverId: number | null;
  messages: (GetChat_GetChat_chat_messages | null)[] | null;
}

export interface GetChat_GetChat {
  __typename: "GetChatResponse";
  ok: boolean;
  error: string | null;
  chat: GetChat_GetChat_chat | null;
}

export interface GetChat {
  GetChat: GetChat_GetChat;
}

export interface GetChatVariables {
  chatId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendMessage
// ====================================================

export interface SendMessage_SendChatMessage_message {
  __typename: "Message";
  id: number;
  text: string;
  userId: number | null;
}

export interface SendMessage_SendChatMessage {
  __typename: "SendChatMessageResponse";
  ok: boolean;
  error: string | null;
  message: SendMessage_SendChatMessage_message | null;
}

export interface SendMessage {
  SendChatMessage: SendMessage_SendChatMessage;
}

export interface SendMessageVariables {
  text: string;
  chatId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: MessageSubscription
// ====================================================

export interface MessageSubscription_MessageSubscription {
  __typename: "Message";
  id: number;
  text: string;
  userId: number | null;
}

export interface MessageSubscription {
  MessageSubscription: MessageSubscription_MessageSubscription | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface UpdateProfile {
  UpdateMyProfile: UpdateProfile_UpdateMyProfile;
}

export interface UpdateProfileVariables {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReportMovement
// ====================================================

export interface ReportMovement_ReportMovement {
  __typename: "ReportMovementResponse";
  ok: boolean;
  error: string | null;
}

export interface ReportMovement {
  ReportMovement: ReportMovement_ReportMovement;
}

export interface ReportMovementVariables {
  lat: number;
  lng: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDrivers
// ====================================================

export interface GetDrivers_GetNearbyDrivers_drivers {
  __typename: "User";
  id: number;
  lastLat: number | null;
  lastLng: number | null;
}

export interface GetDrivers_GetNearbyDrivers {
  __typename: "GetNearbyDriversResponse";
  ok: boolean;
  drivers: (GetDrivers_GetNearbyDrivers_drivers | null)[] | null;
}

export interface GetDrivers {
  GetNearbyDrivers: GetDrivers_GetNearbyDrivers;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RequestRide
// ====================================================

export interface RequestRide_RequestRide_ride {
  __typename: "Ride";
  id: number;
}

export interface RequestRide_RequestRide {
  __typename: "RequestRideResponse";
  ok: boolean;
  error: string | null;
  ride: RequestRide_RequestRide_ride | null;
}

export interface RequestRide {
  RequestRide: RequestRide_RequestRide;
}

export interface RequestRideVariables {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRides
// ====================================================

export interface GetRides_GetNearbyRide_ride_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface GetRides_GetNearbyRide_ride {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: GetRides_GetNearbyRide_ride_passenger;
}

export interface GetRides_GetNearbyRide {
  __typename: "GetNearbyRideResponse";
  ok: boolean;
  error: string | null;
  ride: GetRides_GetNearbyRide_ride | null;
}

export interface GetRides {
  GetNearbyRide: GetRides_GetNearbyRide;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AcceptRide
// ====================================================

export interface AcceptRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface AcceptRide {
  UpdateRideStatus: AcceptRide_UpdateRideStatus;
}

export interface AcceptRideVariables {
  rideId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NearbyRides
// ====================================================

export interface NearbyRides_NearbyRideSubscription_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface NearbyRides_NearbyRideSubscription {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: NearbyRides_NearbyRideSubscription_passenger;
}

export interface NearbyRides {
  NearbyRideSubscription: NearbyRides_NearbyRideSubscription | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartPhoneVerification
// ====================================================

export interface StartPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerification {
  StartPhoneVerification: StartPhoneVerification_StartPhoneVerification | null;
}

export interface StartPhoneVerificationVariables {
  phoneNumber: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRide
// ====================================================

export interface GetRide_GetRide_ride_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface GetRide_GetRide_ride_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface GetRide_GetRide_ride {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  driver: GetRide_GetRide_ride_driver;
  passenger: GetRide_GetRide_ride_passenger;
  chatId: number | null;
}

export interface GetRide_GetRide {
  __typename: "GetRideResponse";
  ok: boolean;
  error: string | null;
  ride: GetRide_GetRide_ride | null;
}

export interface GetRide {
  GetRide: GetRide_GetRide;
}

export interface GetRideVariables {
  rideId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: RideUpdates
// ====================================================

export interface RideUpdates_RideStatusSubscription_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface RideUpdates_RideStatusSubscription_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface RideUpdates_RideStatusSubscription {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  driver: RideUpdates_RideStatusSubscription_driver;
  passenger: RideUpdates_RideStatusSubscription_passenger;
  chatId: number | null;
}

export interface RideUpdates {
  RideStatusSubscription: RideUpdates_RideStatusSubscription | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRide
// ====================================================

export interface UpdateRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface UpdateRide {
  UpdateRideStatus: UpdateRide_UpdateRideStatus;
}

export interface UpdateRideVariables {
  rideId: number;
  status: StatusOptions;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FacebookConnect
// ====================================================

export interface FacebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnect {
  FacebookConnect: FacebookConnect_FacebookConnect;
}

export interface FacebookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyPhone
// ====================================================

export interface VerifyPhone_CompletePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface VerifyPhone {
  CompletePhoneVerification: VerifyPhone_CompletePhoneVerification;
}

export interface VerifyPhoneVariables {
  key: string;
  phoneNumber: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfile
// ====================================================

export interface UserProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  profilePhoto: string | null;
  firstName: string;
  lastName: string;
  email: string | null;
  fullName: string | null;
  isDriving: boolean;
}

export interface UserProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: UserProfile_GetMyProfile_user | null;
}

export interface UserProfile {
  GetMyProfile: UserProfile_GetMyProfile;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaces
// ====================================================

export interface GetPlaces_GetMyPlaces_places {
  __typename: "Place";
  id: number;
  name: string;
  address: string;
  isFav: boolean;
}

export interface GetPlaces_GetMyPlaces {
  __typename: "GetMyPlacesResponse";
  ok: boolean;
  error: string | null;
  places: (GetPlaces_GetMyPlaces_places | null)[] | null;
}

export interface GetPlaces {
  GetMyPlaces: GetPlaces_GetMyPlaces;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum StatusOptions {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
  ONROUTE = "ONROUTE",
  REQUESTING = "REQUESTING"
}

//==============================================================
// END Enums and Input Objects
//==============================================================
