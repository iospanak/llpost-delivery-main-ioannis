import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Html5QrcodeError, Html5QrcodeResult } from "html5-qrcode/esm/core";
import { useEffect, useRef } from "react";

// @ts-ignore
export const QrCodeScanner = ({onScanSuccess}) => {
    const barcodeScannerContainer = useRef<HTMLDivElement | null>(null);
    const barcodeScanner = useRef<Html5QrcodeScanner | undefined>(undefined);

    console.log(barcodeScannerContainer.current)
    // @ts-ignore
    const onScanError = (errorMessage: string, error: Html5QrcodeError) => {
    };
    const _onScanSuccess = (decodedText: string, result: Html5QrcodeResult) => {
        console.log(result);
        barcodeScanner.current?.pause();
        onScanSuccess(decodedText, result)
    }

    useEffect(() => {
        barcodeScanner.current = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10,
                aspectRatio: 1,
                disableFlip: false,
                experimentalFeatures: {useBarCodeDetectorIfSupported: false},
                formatsToSupport: [0],
                rememberLastUsedCamera: true,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
                videoConstraints: {height: 200, width: 200},
                qrbox: 250
            },
            true
        );
         barcodeScanner.current.render(_onScanSuccess, onScanError);
    }, [barcodeScannerContainer.current]);

    // @ts-ignore
    return (
        <div>

            <div id={"qr-reader"} ref={barcodeScannerContainer}>
                Barcode Scanner
            </div>
        </div>
    );
};
