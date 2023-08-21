import React, { useState } from 'react';

import { getLayout } from '../components/layouts/site-layout';
import { useToasts } from "react-toast-notifications";
import { QrCodeScanner } from "../components/qr-code-scanner";
import { Html5QrcodeResult } from "html5-qrcode/esm/core";
import { CameraIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { encodeGetParams } from "../services/api.service";


const Index = () => {

	const {push} = useRouter();

	// @ts-ignore
	const {addToast} = useToasts();
	const [openScanner, setOpenScanner] = useState<boolean>(false);

	// @ts-ignore
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

	}

	const onScanSuccess = (decodedText: string, result: Html5QrcodeResult) => {
		if (result.result.format?.format == 0) {

			setOpenScanner(false);
			push({
				pathname: '/deliveries',
				query: '&' + encodeGetParams({
					load: true,
					page: 1,
					take: 10,
					q: decodedText,
					order: 'ASC',
					orderBy: ''
				}, 'd_')
			}).then(_ => {
			});
		}
	}


	return (
		<div>
			<div className='flex flex-wrap -mx-3 mt-6 space-y-6'>
				<div className='w-full px-3'>

					{openScanner ? <QrCodeScanner onScanSuccess={onScanSuccess}/> : ''}

					{openScanner ? null : <button

						onClick={() => setOpenScanner(true)}
						className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold shadow-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
					>
						<CameraIcon className='h-5 w-5 text-gray-400'/>
					</button>}
				</div>

			</div>

		</div>
	);
};
Index.getLayout = getLayout;
export default Index;
