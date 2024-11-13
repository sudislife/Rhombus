"use client"

import { useState }                       from "react";
import { Accordion, AccordionItem }       from "@nextui-org/accordion";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button }                         from "@nextui-org/button";
import { Card, CardHeader, CardBody }     from "@nextui-org/card";
import { Divider }                        from "@nextui-org/divider";
import { Input }                          from "@nextui-org/input";
import { Slider }                         from "@nextui-org/slider";
import { setPriority }                    from "os";

async function handleOnSubmit(
  event: React.FormEvent<HTMLFormElement>,
  file: File,
  numSensitivity: number,
  catSensitivity: number,
  setProcessedData: any
) {
  console.log("Uploading file", file, numSensitivity, catSensitivity);
  // event.preventDefault();

  if(!file) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("numSensitivity", numSensitivity);
  formData.append("catSensitivity", catSensitivity);

  try{
    const response = await fetch("http://localhost:8000/api_upload/", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setProcessedData(data);

    if (response.ok) {
      console.log(data);
    }
  } catch (error) {
    console.log("Error uploading file", error);
  }
}

function dataTypeRow(dataTypes: string[], numDataTypeRows: number) {
  return (
    <div className="flex flex-row gap-2">
      <Input label="Type Column Name" />
      <Autocomplete label="Select Data Type">
        {dataTypes.map((type) => (
          <AutocompleteItem key={type} value={type}>
            {type}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <div className="flex flex-row gap-2">
        <Button color="primary" variant="bordered" onPress={(e) => addDataTypeRow(dataTypes, numDataTypeRows)}>
          Add
        </Button>
        <Button color="danger" variant="bordered">
          Remove
        </Button>
      </div>
    </div>)
}

function addDataTypeRow(dataTypes: string[], numDataTypeRows: number) {
  numDataTypeRows++;
  return dataTypeRow(dataTypes, numDataTypeRows);
  
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [numSensitivity, setNumSensitivity] = useState(0.7);
  const [catSensitivity, setCatSensitivity] = useState(0.7);
  const [processedData, setProcessedData] = useState(null);
  const dataTypes = [
    "bool", 
    "category", "complex", 
    "datetime64",
    "float64", "float32", "float16", "float8", 
    "int64", "int32", "int16", "int8", 
    "object",
    "timedelta[ns]", 
  ];
  let numDataTypeRows = 1;

  return (
    <Card className="min-w-[800px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-row">
          <p className="text-large">To get started upload your file here</p>
        </div>
      </CardHeader>

      <CardBody>
        <form
          onSubmit={(e) =>
            handleOnSubmit(
              e,
              file,
              numSensitivity,
              catSensitivity,
              setProcessedData,
            )
          }
        >
          <Input
            type="file"
            onChange={(e) => {
              if (!e.target.files) return;
              setFile(e.target.files[0]);
            }}
          />
          <Accordion>
            <AccordionItem title="Advanced Settings">
              <Slider 
                defaultValue={numSensitivity}
                label="Threshold to numeric columns (Threshold after which column is considered numeric)"
                maxValue={1}
                minValue={0}
                step={0.1}
                onChange={(value) =>
                  setNumSensitivity(Array.isArray(value) ? value[0] : value)
                }
              />
              <Slider 
                defaultValue={catSensitivity} 
                label="Threshold to categorical columns (Threshold after which column is considered categorical)"
                maxValue={1}
                minValue={0}
                step={0.1}
                onChange={(value) =>
                  setCatSensitivity(Array.isArray(value) ? value[0] : value)
                }
              />
            </AccordionItem>
            <AccordionItem title="Override Data Type">
              {Array.from({ length: numDataTypeRows }, (_, i) => (
                <div key={i}>{dataTypeRow(dataTypes, numDataTypeRows)}</div>
              ))}
            </AccordionItem>
          </Accordion>
        </form>

        <div style={{ padding:'1em' }}>
          <Button color="primary" variant="bordered" onPress={(e: PressEvent) => {handleOnSubmit(e, file, numSensitivity, catSensitivity, setProcessedData)}}>
            Upload
          </Button>
        </div>
      </CardBody>

      <Divider />
            
      
    </Card>
  );
}
