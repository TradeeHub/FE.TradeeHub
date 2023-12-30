import React from "react";
import moment from "moment";
import { HeaderJoinConfig } from "./SharedInterfaces";

interface HeaderConfig {
  header: string; // The actual key used in the data
  displayHeader: string; // The display name of the header
  hidden: boolean; // Whether the header is hidden
  imageInitials?: string[] | null;
}

const formatHeaders = (str: string): string => {
  const spacedStr = str.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Convert to upper case
  return spacedStr.toUpperCase();
};

const flattenJoiningHeaders = (
  joiningHeaderArr: HeaderJoinConfig[] | undefined,
): string[] => {
  if (!joiningHeaderArr) {
    return [];
  }
  console.log("Kkkkkk", joiningHeaderArr);
  return joiningHeaderArr.reduce((acc, joinConfig) => {
    return acc.concat(joinConfig.joiningHeaders);
  }, [] as string[]);
};

const extractHeadersFromDataArray = (
  dataArray: Array<{ node: object }>,
  hiddenColumns?: string[] | null,
  joiningHeaderArr?: HeaderJoinConfig[] | null,
): HeaderConfig[] => {
  const headersSet = new Set<HeaderConfig>();
  let reduced: string[];

  if (dataArray.length > 0 && dataArray[0].node) {
    const nodeKeys = Object.keys(dataArray[0].node);

    joiningHeaderArr?.forEach((joinConfig) => {
      headersSet.add({
        header: joinConfig.displayAs,
        displayHeader: formatHeaders(joinConfig.displayAs),
        hidden: joinConfig.hidden ?? false,
        imageInitials: joinConfig.imageInitials,
      });
    });
    console.log("ttttt", joiningHeaderArr);

    if (joiningHeaderArr) {
      reduced = flattenJoiningHeaders(joiningHeaderArr);
    }

    nodeKeys.forEach((key: string) => {
      if (key !== "__typename" && !reduced.includes(key)) {
        headersSet.add({
          header: key,
          displayHeader: formatHeaders(key),
          hidden: hiddenColumns ? hiddenColumns.includes(key) : false,
        });
      }
    });
  }

  return Array.from(headersSet);
};

const GenericGrid = ({
  data,
  hiddenColumns,
  joiningHeaders,
}: {
  data: any;
  hiddenColumns: string[] | null;
  joiningHeaders: HeaderJoinConfig[] | null;
}) => {
  const dataIsPaged = data && data.pageInfo != null;

  if (!dataIsPaged || !Array.isArray(data.edges) || data.edges.length === 0) {
    return <p>No data or wrong data format supplied.</p>;
  }

  const dataArray = dataIsPaged ? data.edges : data;
  const headers = extractHeadersFromDataArray(
    dataArray,
    hiddenColumns,
    joiningHeaders,
  );

  // Function to handle the rendering of each cell's content
  const renderCellContent = (
    content: any,
    header: HeaderConfig,
    joiningHeadersArr: HeaderJoinConfig[] | null,
  ) => {
    console.log("joining headerssss ", joiningHeadersArr);
    if (Array.isArray(content)) {
      if (header.header === "phoneNumbers") {
        return (
          <>
            {content.map((phone, index) => (
              <React.Fragment key={index}>
                {phone.phoneNumber}
                <br />
              </React.Fragment>
            ))}
          </>
        );
      } else if (header.header === "properties") {
        return (
          <>
            {content.map((property, index) => (
              <React.Fragment key={index}>
                {property.propertyAddress.fullAddress}
                <br />
              </React.Fragment>
            ))}
          </>
        );
      }
      // Fallback for any other arrays that might not have specific properties to display
      return content.join(", ");
    } else if (
      header.header === "modifiedAt" ||
      header.header === "createdAt"
    ) {
      return <>{moment(content).format("Do MMM YYYY h:mma")}</>;
    }
    // Return content as is if it's not an array
    return content;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {headers.map((header, index) =>
                    !header.hidden ? (
                      <th
                        key={index}
                        className="px-3 py-3.5 text-left text-center text-sm font-semibold text-gray-900"
                      >
                        {header.displayHeader}
                      </th>
                    ) : (
                      ""
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {dataArray.map((item: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    {headers.map((header, columnIndex) =>
                      !header.hidden ? (
                        <td
                          key={columnIndex}
                          className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-500"
                        >
                          {renderCellContent(
                            item.node[header.header],
                            header,
                            joiningHeaders,
                          )}
                        </td>
                      ) : (
                        ""
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericGrid;
