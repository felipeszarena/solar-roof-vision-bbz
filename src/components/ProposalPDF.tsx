
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 120,
    color: '#666',
  },
  value: {
    flex: 1,
  },
});

interface ProposalPDFProps {
  proposal: {
    id: string;
    projectName: string;
    client: string;
    createdAt: string;
    expiresAt: string;
    value: string;
    roi: string;
    panels: number;
  };
}

const ProposalPDF = ({ proposal }: ProposalPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Proposta Solar</Text>
        <Text style={styles.subtitle}>{proposal.projectName}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{proposal.client}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data de criação:</Text>
          <Text style={styles.value}>{proposal.createdAt}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Validade até:</Text>
          <Text style={styles.value}>{proposal.expiresAt}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Valor total:</Text>
          <Text style={styles.value}>{proposal.value}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ROI estimado:</Text>
          <Text style={styles.value}>{proposal.roi}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Painéis solares:</Text>
          <Text style={styles.value}>{proposal.panels} unidades</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ProposalPDF;
