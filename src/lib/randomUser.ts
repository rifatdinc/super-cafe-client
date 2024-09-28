interface User {
	results: Result[];
	info: Info;
}

interface Result {
	gender: string;
	name: Name;
	location: Location;
	email: string;
	login: Login;
	dob: Dob;
	registered: Registered;
	phone: string;
	cell: string;
	id: Id;
	picture: Picture;
	nat: string;
}

interface Name {
	title: string;
	first: string;
	last: string;
}

interface Location {
	street: Street;
	city: string;
	state: string;
	country: string;
	postcode: number;
	coordinates: Coordinates;
	timezone: Timezone;
}

interface Street {
	number: number;
	name: string;
}

interface Coordinates {
	latitude: string;
	longitude: string;
}

interface Timezone {
	offset: string;
	description: string;
}

interface Login {
	uuid: string;
	username: string;
	password: string;
	salt: string;
	md5: string;
	sha1: string;
	sha256: string;
}

interface Dob {
	date: string;
	age: number;
}

interface Registered {
	date: string;
	age: number;
}

interface Id {
	name: string;
	value: string | null;
}

interface Picture {
	large: string;
	medium: string;
	thumbnail: string;
}

interface Info {
	seed: string;
	results: number;
	page: number;
	version: string;
}

export const randomUser = (): User => {
	return {
		"results": [
			{
				"gender": "male",
				"name": {
					"title": "Mr",
					"first": "Divozir",
					"last": "Lonchina"
				},
				"location": {
					"street": {
						"number": 7975,
						"name": "Mikoli Karpenka"
					},
					"city": "Druzhba",
					"state": "Sumska",
					"country": "Ukraine",
					"postcode": 49972,
					"coordinates": {
						"latitude": "79.4395",
						"longitude": "-65.3655"
					},
					"timezone": {
						"offset": "+4:00",
						"description": "Abu Dhabi, Muscat, Baku, Tbilisi"
					}
				},
				"email": "divozir.lonchina@example.com",
				"login": {
					"uuid": "589c34b7-762d-4878-9897-a86d52163b04",
					"username": "organicladybug693",
					"password": "lexus",
					"salt": "Bzj1FBIu",
					"md5": "23b8e76afbe78ea496da01d11a020dd0",
					"sha1": "47bd175e43bdd45648d9c43aba30dc72b64758f4",
					"sha256": "fd5acfa69d39407d232e45e2b5d9701c79a8e0a5decc36e5ab2da30dac5f9bfc"
				},
				"dob": {
					"date": "1974-06-30T04:32:12.458Z",
					"age": 50
				},
				"registered": {
					"date": "2010-11-22T15:19:10.585Z",
					"age": 13
				},
				"phone": "(068) E03-2702",
				"cell": "(098) K57-8024",
				"id": {
					"name": "",
					"value": null
				},
				"picture": {
					"large": "https://randomuser.me/api/portraits/men/85.jpg",
					"medium": "https://randomuser.me/api/portraits/med/men/85.jpg",
					"thumbnail": "https://randomuser.me/api/portraits/thumb/men/85.jpg"
				},
				"nat": "UA"
			},
			{
				"gender": "male",
				"name": {
					"title": "Mr",
					"first": "Morris",
					"last": "Byrd"
				},
				"location": {
					"street": {
						"number": 7717,
						"name": "George Street"
					},
					"city": "Listowel",
					"state": "Leitrim",
					"country": "Ireland",
					"postcode": 69222,
					"coordinates": {
						"latitude": "54.6378",
						"longitude": "-32.0929"
					},
					"timezone": {
						"offset": "+5:30",
						"description": "Bombay, Calcutta, Madras, New Delhi"
					}
				},
				"email": "morris.byrd@example.com",
				"login": {
					"uuid": "8bc04776-b1bc-4398-ae29-824983a651cd",
					"username": "redgorilla403",
					"password": "cheerleaers",
					"salt": "3iKGipIG",
					"md5": "c4c1bd6f65396515be06b646c3c734b7",
					"sha1": "e6e6ddb396f5310184f06b7b2a348c5f57e0ae86",
					"sha256": "6f7a3892b0fabedb5824d3344f5d4a93e2768bbfeb8ff54ff47bf7179a41722b"
				},
				"dob": {
					"date": "1951-04-09T02:19:20.458Z",
					"age": 73
				},
				"registered": {
					"date": "2017-05-14T00:46:17.341Z",
					"age": 7
				},
				"phone": "021-417-1841",
				"cell": "081-424-7623",
				"id": {
					"name": "PPS",
					"value": "7724492T"
				},
				"picture": {
					"large": "https://randomuser.me/api/portraits/men/84.jpg",
					"medium": "https://randomuser.me/api/portraits/med/men/84.jpg",
					"thumbnail": "https://randomuser.me/api/portraits/thumb/men/84.jpg"
				},
				"nat": "IE"
			},
			{
				"gender": "female",
				"name": {
					"title": "Ms",
					"first": "Sofija",
					"last": "Tomašević"
				},
				"location": {
					"street": {
						"number": 8996,
						"name": "Porodice Petrović"
					},
					"city": "Vranje",
					"state": "Braničevo",
					"country": "Serbia",
					"postcode": 33469,
					"coordinates": {
						"latitude": "-63.7932",
						"longitude": "-3.5837"
					},
					"timezone": {
						"offset": "+4:30",
						"description": "Kabul"
					}
				},
				"email": "sofija.tomasevic@example.com",
				"login": {
					"uuid": "3b2d6274-7ca3-46bc-b76f-3dccdeaeae04",
					"username": "blackgoose602",
					"password": "herman",
					"salt": "X24FiLmv",
					"md5": "f9d8c4f1ff4474ff84e73d894dda2ead",
					"sha1": "ebb0194c16e3a829a58187a5aa0a7b8f9c61ee3d",
					"sha256": "85b35d0eab22f6c2c945c8585364b843f96a571ab7487c83fa2927f133f3386e"
				},
				"dob": {
					"date": "1990-04-21T14:32:26.573Z",
					"age": 34
				},
				"registered": {
					"date": "2008-02-22T19:09:09.944Z",
					"age": 16
				},
				"phone": "030-2926-944",
				"cell": "065-5959-831",
				"id": {
					"name": "SID",
					"value": "685739133"
				},
				"picture": {
					"large": "https://randomuser.me/api/portraits/women/33.jpg",
					"medium": "https://randomuser.me/api/portraits/med/women/33.jpg",
					"thumbnail": "https://randomuser.me/api/portraits/thumb/women/33.jpg"
				},
				"nat": "RS"
			}
		],
		"info": {
			"seed": "cf923702f69e56f2",
			"results": 3,
			"page": 1,
			"version": "1.4"
		}
	}
};
