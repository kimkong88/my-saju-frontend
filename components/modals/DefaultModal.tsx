"use client";

import { Button, Modal } from "@heroui/react";

export default function DefaultModal({
    trigger,
    title,
    description,
}: {
    trigger: React.ReactNode;
    title: string;
    description: string | React.ReactNode;
}) {
    return (
        <Modal>
            {trigger}
            <Modal.Backdrop className="z-100">
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        {(renderProps) => (
                            <>
                                <Modal.CloseTrigger />
                                <Modal.Header>
                                    <Modal.Heading className="text-2xl font-bold">
                                        {title}
                                    </Modal.Heading>
                                </Modal.Header>
                                <Modal.Body>{description}</Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        className="bg-slate-900 hover:bg-slate-800"
                                        onPress={renderProps.close}
                                    >
                                        Ok
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
